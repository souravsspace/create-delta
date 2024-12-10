import {
  MAX_UPLOAD_IMAGE_SIZE_IN_MB,
  MAX_UPLOAD_IMAGE_SIZE,
} from "@/constants/app-config";
import { createUUID } from "@/lib/utils";
import { getFileUrl, uploadFileToBucket } from "@/lib/file";
import { UserId } from "@/others/data-access/types";
import { PublicError } from "@/others/use-case/errors";
import { updateProfile } from "@/others/data-access/profile";
import { Profile } from "@/db/schema";

export async function updateProfileImageUseCase(file: File, userId: UserId) {
  if (!file.type.startsWith("image/")) {
    throw new PublicError("File should be an image.");
  }

  if (file.size > MAX_UPLOAD_IMAGE_SIZE) {
    throw new PublicError(
      `File size should be less than ${MAX_UPLOAD_IMAGE_SIZE_IN_MB}MB.`,
    );
  }

  const imageId = createUUID();
  const imageKey = getProfileImageKey(userId, imageId);

  await uploadFileToBucket(file, imageKey);

  const imageUrl = await getProfileImageUrlUseCase({
    userId,
    imageId,
  });

  await updateProfile(userId, { imageUrl });
}

export const getProfileImageKey = (userId: UserId, imageId: string) => {
  return `users/${userId}/images/${imageId}`;
};

export const getProfileImageUrlUseCase = async ({
  userId,
  imageId,
}: {
  userId: UserId;
  imageId: string;
}) => {
  const url = await getFileUrl({
    key: getProfileImageKey(userId, imageId),
  });

  return url;
};

export const updateProfileUseCase = async (
  userId: UserId,
  data: Partial<Profile>,
) => {
  await updateProfile(userId, data);
};
