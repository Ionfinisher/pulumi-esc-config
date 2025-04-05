import * as esc from "@pulumi/esc-sdk";

// Initialize the ESC SDK client
const client = esc.DefaultClient();

export async function getSecrets(orgName, projName, envName) {
  // Validate required parameters
  if (!orgName || !projName || !envName) {
    throw new Error(
      "Organization, project, and environment names are required"
    );
  }

  try {
    // Open and read the environment
    const openEnv = await client.openAndReadEnvironment(
      orgName,
      projName,
      envName
    );

    if (!openEnv) {
      throw new Error("Environment not found");
    }

    if (!openEnv.secrets) {
      throw new Error("No secrets found");
    }

    return openEnv.secrets;
  } catch (error) {
    console.error("Error getting secrets:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}
