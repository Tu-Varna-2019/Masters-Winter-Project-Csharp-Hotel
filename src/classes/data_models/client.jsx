import React, { useEffect, useState } from "react";

import { fetchUserAttributes } from "aws-amplify/auth";

import { HelpersContext } from "../../contexts/data_models/context";
import { createClient } from "../../graphql/mutations";
import { listClients, getClient, getRegistration } from "../../graphql/queries";

export function Client() {
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);
  const [ssn, setSsn] = useState([]);
  const [passport, setPassport] = useState([]);
  const [allClientIDNames, setAllClientIDNames] = useState({});
  const [selectedRegistrationName, setSelectedRegistrationName] = useState("");

  const { UtilsObject } = React.useContext(HelpersContext);
  const { logger, client } = UtilsObject;

  // Fetch user attributes
  useEffect(() => {
    async function fetchData() {
      try {
        const userAttributes = await fetchUserAttributes();
        setName(userAttributes.name);
        setAddress(userAttributes.address);
        setSsn(userAttributes["custom:SocialSecurityNumber"]);
        setPassport(userAttributes["custom:Passport"]);

        // Fetch all clients with the specified SSN
        const response = await client.graphql({
          query: listClients,
          variables: {
            filter: {
              ssn: { eq: userAttributes["custom:SocialSecurityNumber"] },
            },
          },
        });

        if (response.data.listClients.items.length === 0) {
          // No existing clients found, create a new client
          logger.info(
            "No existing clients found, creating a new client. Creating new client..."
          );
          await client.graphql({
            query: createClient,
            variables: {
              input: {
                name: userAttributes.name,
                address: userAttributes.address,
                ssn: userAttributes["custom:SocialSecurityNumber"],
                passport: userAttributes["custom:Passport"],
                // Dummy value for now
                PKRegistration: "d9ad2f90-a6c9-4132-b46c-5ee4227ef101",
              },
            },
          });
        } else logger.info("Existing client found, not creating a new client.");
      } catch (error) {
        console.error("Error in fetching/creating client:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getAllCLients() {
      try {
        const response = await client.graphql({
          query: listClients,
        });
        response.data.listClients.items.forEach((client) => {
          setAllClientIDNames((prevState) => ({
            ...prevState,
            [client.id]: client.name,
          }));
        });
      } catch (error) {
        logger.error(error);
      }
    }
    getAllCLients();
  }, [client, logger]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleSsnChange = (event) => {
    setSsn(event.target.value);
  };
  const handlePassportChange = (event) => {
    setPassport(event.target.value);
  };

  const setCllientByAllClientIDNames = async () => {
    const clientID = UtilsObject.dictFindKeyByValue(allClientIDNames, name);

    // Get a specific item
    const selectedClient = await client.graphql({
      query: getClient,
      variables: { id: clientID },
    });

    setName(selectedClient.data.getClient.name);
    setAddress(selectedClient.data.getClient.address);
    setSsn(selectedClient.data.getClient.ssn);
    setPassport();

    // Get a specific item
    const oneRegistration = await client.graphql({
      query: getRegistration,
      variables: { id: selectedClient.data.getClient.passport },
    });
    setSelectedRegistrationName(oneRegistration.data.getRegistration.name);
  };

  const handleSelectedRegistrationName = (event) => {
    setSelectedRegistrationName(event.target.value);
  };

  return {
    selectedRegistrationName,
    handleSelectedRegistrationName,
    setCllientByAllClientIDNames,
    name,
    address,
    ssn,
    passport,
    handleNameChange,
    handleAddressChange,
    handleSsnChange,
    handlePassportChange,
    allClientIDNames,
    setAllClientIDNames,
  };
}
