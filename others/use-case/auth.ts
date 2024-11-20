import {
  createUserFromDatabase,
  getUserByEmailFromDatabase,
  getAccountByGoogleIdFromDatabase,
  getAccountByGithubIdFromDatabase,
  createAccountViaGoogleFromDatabase,
  createAccountViaGithubFromDatabase,
} from "@/others/data-access/auth";
import { GoogleUser } from "@/app/api/[[...route]]/routes/auth/google";
import { GitHubUser } from "@/app/api/[[...route]]/routes/auth/github";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleIdFromDatabase(googleId);
}

export async function getAccountByGithubIdUseCase(githubId: string) {
  return await getAccountByGithubIdFromDatabase(githubId);
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmailFromDatabase(googleUser.email);

  if (!existingUser) {
    existingUser = await createUserFromDatabase(googleUser.email);
  }

  await createAccountViaGoogleFromDatabase(existingUser.id, googleUser);

  return existingUser.id;
}

export async function createGithubUserUseCase(githubUser: GitHubUser) {
  let existingUser = await getUserByEmailFromDatabase(githubUser.email);

  if (!existingUser) {
    existingUser = await createUserFromDatabase(githubUser.email);
  }

  await createAccountViaGithubFromDatabase(existingUser.id, githubUser);

  return existingUser.id;
}
