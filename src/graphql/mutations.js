/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRegistration = /* GraphQL */ `
  mutation CreateRegistration(
    $input: CreateRegistrationInput!
    $condition: ModelRegistrationConditionInput
  ) {
    createRegistration(input: $input, condition: $condition) {
      id
      dateCreation
      dateStart
      dateEnd
      registrationNumber
      untitledfield
      FKClients {
        items {
          id
          name
          ssn
          address
          passport
          PKRegistration
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      FKRooms {
        items {
          id
          roomNumber
          category
          floor
          beds
          price
          PKRegistration
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRegistration = /* GraphQL */ `
  mutation UpdateRegistration(
    $input: UpdateRegistrationInput!
    $condition: ModelRegistrationConditionInput
  ) {
    updateRegistration(input: $input, condition: $condition) {
      id
      dateCreation
      dateStart
      dateEnd
      registrationNumber
      untitledfield
      FKClients {
        items {
          id
          name
          ssn
          address
          passport
          PKRegistration
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      FKRooms {
        items {
          id
          roomNumber
          category
          floor
          beds
          price
          PKRegistration
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRegistration = /* GraphQL */ `
  mutation DeleteRegistration(
    $input: DeleteRegistrationInput!
    $condition: ModelRegistrationConditionInput
  ) {
    deleteRegistration(input: $input, condition: $condition) {
      id
      dateCreation
      dateStart
      dateEnd
      registrationNumber
      untitledfield
      FKClients {
        items {
          id
          name
          ssn
          address
          passport
          PKRegistration
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      FKRooms {
        items {
          id
          roomNumber
          category
          floor
          beds
          price
          PKRegistration
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRoom = /* GraphQL */ `
  mutation CreateRoom(
    $input: CreateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    createRoom(input: $input, condition: $condition) {
      id
      roomNumber
      category
      floor
      beds
      price
      PKRegistration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRoom = /* GraphQL */ `
  mutation UpdateRoom(
    $input: UpdateRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    updateRoom(input: $input, condition: $condition) {
      id
      roomNumber
      category
      floor
      beds
      price
      PKRegistration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRoom = /* GraphQL */ `
  mutation DeleteRoom(
    $input: DeleteRoomInput!
    $condition: ModelRoomConditionInput
  ) {
    deleteRoom(input: $input, condition: $condition) {
      id
      roomNumber
      category
      floor
      beds
      price
      PKRegistration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
      id
      name
      ssn
      address
      passport
      PKRegistration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
      id
      name
      ssn
      address
      passport
      PKRegistration
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
      id
      name
      ssn
      address
      passport
      PKRegistration
      createdAt
      updatedAt
      __typename
    }
  }
`;