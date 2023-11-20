/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getRegistration, listClients, listRooms } from "../graphql/queries";
import {
  updateClient,
  updateRegistration,
  updateRoom,
} from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function RegistrationUpdateForm(props) {
  const {
    id: idProp,
    registration: registrationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    dateCreation: "",
    dateStart: "",
    dateEnd: "",
    FKClients: [],
    FKRooms: [],
  };
  const [dateCreation, setDateCreation] = React.useState(
    initialValues.dateCreation
  );
  const [dateStart, setDateStart] = React.useState(initialValues.dateStart);
  const [dateEnd, setDateEnd] = React.useState(initialValues.dateEnd);
  const [FKClients, setFKClients] = React.useState(initialValues.FKClients);
  const [FKClientsLoading, setFKClientsLoading] = React.useState(false);
  const [FKClientsRecords, setFKClientsRecords] = React.useState([]);
  const [FKRooms, setFKRooms] = React.useState(initialValues.FKRooms);
  const [FKRoomsLoading, setFKRoomsLoading] = React.useState(false);
  const [FKRoomsRecords, setFKRoomsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = registrationRecord
      ? {
          ...initialValues,
          ...registrationRecord,
          FKClients: linkedFKClients,
          FKRooms: linkedFKRooms,
        }
      : initialValues;
    setDateCreation(cleanValues.dateCreation);
    setDateStart(cleanValues.dateStart);
    setDateEnd(cleanValues.dateEnd);
    setFKClients(cleanValues.FKClients ?? []);
    setCurrentFKClientsValue(undefined);
    setCurrentFKClientsDisplayValue("");
    setFKRooms(cleanValues.FKRooms ?? []);
    setCurrentFKRoomsValue(undefined);
    setCurrentFKRoomsDisplayValue("");
    setErrors({});
  };
  const [registrationRecord, setRegistrationRecord] = React.useState(
    registrationModelProp
  );
  const [linkedFKClients, setLinkedFKClients] = React.useState([]);
  const canUnlinkFKClients = false;
  const [linkedFKRooms, setLinkedFKRooms] = React.useState([]);
  const canUnlinkFKRooms = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getRegistration.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getRegistration
        : registrationModelProp;
      const linkedFKClients = record?.FKClients?.items ?? [];
      setLinkedFKClients(linkedFKClients);
      const linkedFKRooms = record?.FKRooms?.items ?? [];
      setLinkedFKRooms(linkedFKRooms);
      setRegistrationRecord(record);
    };
    queryData();
  }, [idProp, registrationModelProp]);
  React.useEffect(resetStateValues, [
    registrationRecord,
    linkedFKClients,
    linkedFKRooms,
  ]);
  const [currentFKClientsDisplayValue, setCurrentFKClientsDisplayValue] =
    React.useState("");
  const [currentFKClientsValue, setCurrentFKClientsValue] =
    React.useState(undefined);
  const FKClientsRef = React.createRef();
  const [currentFKRoomsDisplayValue, setCurrentFKRoomsDisplayValue] =
    React.useState("");
  const [currentFKRoomsValue, setCurrentFKRoomsValue] =
    React.useState(undefined);
  const FKRoomsRef = React.createRef();
  const getIDValue = {
    FKClients: (r) => JSON.stringify({ id: r?.id }),
    FKRooms: (r) => JSON.stringify({ id: r?.id }),
  };
  const FKClientsIdSet = new Set(
    Array.isArray(FKClients)
      ? FKClients.map((r) => getIDValue.FKClients?.(r))
      : getIDValue.FKClients?.(FKClients)
  );
  const FKRoomsIdSet = new Set(
    Array.isArray(FKRooms)
      ? FKRooms.map((r) => getIDValue.FKRooms?.(r))
      : getIDValue.FKRooms?.(FKRooms)
  );
  const getDisplayValue = {
    FKClients: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    FKRooms: (r) => `${r?.roomNumber ? r?.roomNumber + " - " : ""}${r?.id}`,
  };
  const validations = {
    dateCreation: [],
    dateStart: [],
    dateEnd: [],
    FKClients: [],
    FKRooms: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchFKClientsRecords = async (value) => {
    setFKClientsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listClients.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listClients?.items;
      var loaded = result.filter(
        (item) => !FKClientsIdSet.has(getIDValue.FKClients?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setFKClientsRecords(newOptions.slice(0, autocompleteLength));
    setFKClientsLoading(false);
  };
  const fetchFKRoomsRecords = async (value) => {
    setFKRoomsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { roomNumber: { contains: value } },
            { id: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listRooms.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listRooms?.items;
      var loaded = result.filter(
        (item) => !FKRoomsIdSet.has(getIDValue.FKRooms?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setFKRoomsRecords(newOptions.slice(0, autocompleteLength));
    setFKRoomsLoading(false);
  };
  React.useEffect(() => {
    fetchFKClientsRecords("");
    fetchFKRoomsRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          dateCreation: dateCreation ?? null,
          dateStart: dateStart ?? null,
          dateEnd: dateEnd ?? null,
          FKClients: FKClients ?? null,
          FKRooms: FKRooms ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const fKClientsToLink = [];
          const fKClientsToUnLink = [];
          const fKClientsSet = new Set();
          const linkedFKClientsSet = new Set();
          FKClients.forEach((r) => fKClientsSet.add(getIDValue.FKClients?.(r)));
          linkedFKClients.forEach((r) =>
            linkedFKClientsSet.add(getIDValue.FKClients?.(r))
          );
          linkedFKClients.forEach((r) => {
            if (!fKClientsSet.has(getIDValue.FKClients?.(r))) {
              fKClientsToUnLink.push(r);
            }
          });
          FKClients.forEach((r) => {
            if (!linkedFKClientsSet.has(getIDValue.FKClients?.(r))) {
              fKClientsToLink.push(r);
            }
          });
          fKClientsToUnLink.forEach((original) => {
            if (!canUnlinkFKClients) {
              throw Error(
                `Client ${original.id} cannot be unlinked from Registration because PKRegistration is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateClient.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    PKRegistration: null,
                  },
                },
              })
            );
          });
          fKClientsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateClient.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    PKRegistration: registrationRecord.id,
                  },
                },
              })
            );
          });
          const fKRoomsToLink = [];
          const fKRoomsToUnLink = [];
          const fKRoomsSet = new Set();
          const linkedFKRoomsSet = new Set();
          FKRooms.forEach((r) => fKRoomsSet.add(getIDValue.FKRooms?.(r)));
          linkedFKRooms.forEach((r) =>
            linkedFKRoomsSet.add(getIDValue.FKRooms?.(r))
          );
          linkedFKRooms.forEach((r) => {
            if (!fKRoomsSet.has(getIDValue.FKRooms?.(r))) {
              fKRoomsToUnLink.push(r);
            }
          });
          FKRooms.forEach((r) => {
            if (!linkedFKRoomsSet.has(getIDValue.FKRooms?.(r))) {
              fKRoomsToLink.push(r);
            }
          });
          fKRoomsToUnLink.forEach((original) => {
            if (!canUnlinkFKRooms) {
              throw Error(
                `Room ${original.id} cannot be unlinked from Registration because PKRegistration is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateRoom.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    PKRegistration: null,
                  },
                },
              })
            );
          });
          fKRoomsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateRoom.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    PKRegistration: registrationRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            dateCreation: modelFields.dateCreation ?? null,
            dateStart: modelFields.dateStart ?? null,
            dateEnd: modelFields.dateEnd ?? null,
          };
          promises.push(
            client.graphql({
              query: updateRegistration.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: registrationRecord.id,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RegistrationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Date creation"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateCreation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dateCreation: value,
              dateStart,
              dateEnd,
              FKClients,
              FKRooms,
            };
            const result = onChange(modelFields);
            value = result?.dateCreation ?? value;
          }
          if (errors.dateCreation?.hasError) {
            runValidationTasks("dateCreation", value);
          }
          setDateCreation(value);
        }}
        onBlur={() => runValidationTasks("dateCreation", dateCreation)}
        errorMessage={errors.dateCreation?.errorMessage}
        hasError={errors.dateCreation?.hasError}
        {...getOverrideProps(overrides, "dateCreation")}
      ></TextField>
      <TextField
        label="Date start"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateStart}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dateCreation,
              dateStart: value,
              dateEnd,
              FKClients,
              FKRooms,
            };
            const result = onChange(modelFields);
            value = result?.dateStart ?? value;
          }
          if (errors.dateStart?.hasError) {
            runValidationTasks("dateStart", value);
          }
          setDateStart(value);
        }}
        onBlur={() => runValidationTasks("dateStart", dateStart)}
        errorMessage={errors.dateStart?.errorMessage}
        hasError={errors.dateStart?.hasError}
        {...getOverrideProps(overrides, "dateStart")}
      ></TextField>
      <TextField
        label="Date end"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateEnd}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              dateCreation,
              dateStart,
              dateEnd: value,
              FKClients,
              FKRooms,
            };
            const result = onChange(modelFields);
            value = result?.dateEnd ?? value;
          }
          if (errors.dateEnd?.hasError) {
            runValidationTasks("dateEnd", value);
          }
          setDateEnd(value);
        }}
        onBlur={() => runValidationTasks("dateEnd", dateEnd)}
        errorMessage={errors.dateEnd?.errorMessage}
        hasError={errors.dateEnd?.hasError}
        {...getOverrideProps(overrides, "dateEnd")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              dateCreation,
              dateStart,
              dateEnd,
              FKClients: values,
              FKRooms,
            };
            const result = onChange(modelFields);
            values = result?.FKClients ?? values;
          }
          setFKClients(values);
          setCurrentFKClientsValue(undefined);
          setCurrentFKClientsDisplayValue("");
        }}
        currentFieldValue={currentFKClientsValue}
        label={"Fk clients"}
        items={FKClients}
        hasError={errors?.FKClients?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("FKClients", currentFKClientsValue)
        }
        errorMessage={errors?.FKClients?.errorMessage}
        getBadgeText={getDisplayValue.FKClients}
        setFieldValue={(model) => {
          setCurrentFKClientsDisplayValue(
            model ? getDisplayValue.FKClients(model) : ""
          );
          setCurrentFKClientsValue(model);
        }}
        inputFieldRef={FKClientsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Fk clients"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Client"
          value={currentFKClientsDisplayValue}
          options={FKClientsRecords.filter(
            (r) => !FKClientsIdSet.has(getIDValue.FKClients?.(r))
          ).map((r) => ({
            id: getIDValue.FKClients?.(r),
            label: getDisplayValue.FKClients?.(r),
          }))}
          isLoading={FKClientsLoading}
          onSelect={({ id, label }) => {
            setCurrentFKClientsValue(
              FKClientsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentFKClientsDisplayValue(label);
            runValidationTasks("FKClients", label);
          }}
          onClear={() => {
            setCurrentFKClientsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchFKClientsRecords(value);
            if (errors.FKClients?.hasError) {
              runValidationTasks("FKClients", value);
            }
            setCurrentFKClientsDisplayValue(value);
            setCurrentFKClientsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("FKClients", currentFKClientsDisplayValue)
          }
          errorMessage={errors.FKClients?.errorMessage}
          hasError={errors.FKClients?.hasError}
          ref={FKClientsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "FKClients")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              dateCreation,
              dateStart,
              dateEnd,
              FKClients,
              FKRooms: values,
            };
            const result = onChange(modelFields);
            values = result?.FKRooms ?? values;
          }
          setFKRooms(values);
          setCurrentFKRoomsValue(undefined);
          setCurrentFKRoomsDisplayValue("");
        }}
        currentFieldValue={currentFKRoomsValue}
        label={"Fk rooms"}
        items={FKRooms}
        hasError={errors?.FKRooms?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("FKRooms", currentFKRoomsValue)
        }
        errorMessage={errors?.FKRooms?.errorMessage}
        getBadgeText={getDisplayValue.FKRooms}
        setFieldValue={(model) => {
          setCurrentFKRoomsDisplayValue(
            model ? getDisplayValue.FKRooms(model) : ""
          );
          setCurrentFKRoomsValue(model);
        }}
        inputFieldRef={FKRoomsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Fk rooms"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Room"
          value={currentFKRoomsDisplayValue}
          options={FKRoomsRecords.filter(
            (r) => !FKRoomsIdSet.has(getIDValue.FKRooms?.(r))
          ).map((r) => ({
            id: getIDValue.FKRooms?.(r),
            label: getDisplayValue.FKRooms?.(r),
          }))}
          isLoading={FKRoomsLoading}
          onSelect={({ id, label }) => {
            setCurrentFKRoomsValue(
              FKRoomsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentFKRoomsDisplayValue(label);
            runValidationTasks("FKRooms", label);
          }}
          onClear={() => {
            setCurrentFKRoomsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchFKRoomsRecords(value);
            if (errors.FKRooms?.hasError) {
              runValidationTasks("FKRooms", value);
            }
            setCurrentFKRoomsDisplayValue(value);
            setCurrentFKRoomsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("FKRooms", currentFKRoomsDisplayValue)
          }
          errorMessage={errors.FKRooms?.errorMessage}
          hasError={errors.FKRooms?.hasError}
          ref={FKRoomsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "FKRooms")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || registrationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || registrationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
