import { getClient, ClientOptions } from "@azure-rest/core-client";
import { PetStoreServiceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class PetStoreServiceClient class.
 *
 */
export default function createClient(
  options: ClientOptions = {}
): PetStoreServiceClient {
  const baseUrl = options.baseUrl ?? "undefined";
  options.apiVersion = options.apiVersion ?? "2021-03-25";

  const userAgentInfo = `azsdk-js-cadl-test-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, options) as PetStoreServiceClient;

  return {
    ...client,
    pets: {
      delete: (petId, options) => {
        return client.path("/pets/{petId}", petId).delete(options);
      },
      read: (petId, options) => {
        return client.path("/pets/{petId}", petId).get(options);
      },
      list: (options) => {
        return client.path("/pets").get(options);
      },
      create: (options) => {
        return client.path("/pets").post(options);
      },
    },
    listPetToysResponse: {
      list: (petId, options) => {
        return client.path("/pets/{petId}/toys", petId).get(options);
      },
    },
  };
}
