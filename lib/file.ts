import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { env } from "@/lib/env";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export const getDownloadUrl = async (objectName: string) => {
  return await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: objectName,
    }),
    { expiresIn: 3600 },
  );
};

export const uploadFileToBucket = async (file: File, filename: string) => {
  const Key = filename;
  const Bucket = env.CLOUDFLARE_BUCKET_NAME;

  let res;

  try {
    const parallelUploads = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key,
        Body: file.stream(),
        ACL: "public-read",
        ContentType: file.type,
      },
      queueSize: 4,
      leavePartsOnError: false,
    });

    res = await parallelUploads.done();
  } catch (e) {
    throw e;
  }

  return res;
};

export const getPresignedPostUrl = async (
  objectName: string,
  contentType: string,
) => {
  return await createPresignedPost(s3Client, {
    Bucket: env.CLOUDFLARE_BUCKET_NAME,
    Key: objectName,
    Conditions: [
      ["content-length-range", 0, 1024 * 1024 * 2],
      ["starts-with", "$Content-Type", contentType],
    ],
    Expires: 600, // 10 minutes
    Fields: {
      acl: "public-read",
      "Content-Type": contentType,
    },
  });
};

export const getFileUrl = async ({ key }: { key: string }) => {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 3600 },
  );
  return url;
};
