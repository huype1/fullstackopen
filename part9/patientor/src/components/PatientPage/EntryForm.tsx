import { Box } from "@mui/system";
import {
  TextField,
  Button,
  Alert,
  Input,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types.ts";
import patientService from "../../services/patients.ts";
import { AxiosError } from "axios";

interface EntryFormProps {
  patientId: string;
  type: string;
  callback: () => void;
  diagnoses: Diagnosis[];
  open: boolean;
  onClose: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({
                                               patientId,
                                               type,
                                               callback,
                                               diagnoses,
                                               open,
                                               onClose
                                             }) => {
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleDiagnosisCodeChange = (code: string) => {
    const updatedCodes = [...diagnosisCodes];

    if (updatedCodes.includes(code)) {
      const index = updatedCodes.indexOf(code);
      updatedCodes.splice(index, 1);
    } else {
      updatedCodes.push(code);
    }

    setDiagnosisCodes(updatedCodes);
  };


  const [error, setError] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");

  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const handleAddEntry = async () => {
    let entry: EntryWithoutId | undefined = undefined;
    switch (type) {
      case "Hospital":
        entry = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        entry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        break;
      case "HealthCheck":
        entry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          healthCheckRating: Number(healthCheckRating),
        };
        break;
      default:
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(type)}`);
    }
    try {
      const result =  await patientService.createEntry(patientId, entry);
      console.log(result);
      setError("");
      callback();
    }
    catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.error;
        if (errorMessage) {
          setError(errorMessage);
        }
      }
    }
  };

  const SpecificToEntry = (type: string) => {
    switch (type) {
      case "Hospital":
        return (
          <Box display={"flex"} flexDirection={"column"} rowGap={"20px"}>
            <InputLabel>Discharge Date</InputLabel>
            <Input
              type="date"
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              fullWidth
              label="Discharge Criteria"
              variant="outlined"
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </Box>
        );
      case "OccupationalHealthcare":
        return (
          <Box display={"flex"} flexDirection={"column"} rowGap={"20px"}>
            <TextField
              fullWidth
              label="Employer Name"
              variant="outlined"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <InputLabel>Sick Leave Start Date</InputLabel>
            <Input
              type="date"
              value={sickLeaveStartDate}
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
            />
            <InputLabel>Sick Leave End Date</InputLabel>
            <Input
              type="date"
              value={sickLeaveEndDate}
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
            />
          </Box>
        );
      case "HealthCheck":
        return (
          <FormControl>
            <FormLabel>Health Check Rating</FormLabel>
            <RadioGroup
              row
              defaultValue="1"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(e.target.value)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Healthy" />
              <FormControlLabel value="2" control={<Radio />} label="Low Risk" />
              <FormControlLabel value="3" control={<Radio />} label="High Risk" />
              <FormControlLabel value="4" control={<Radio />} label="Critical Risk" />
            </RadioGroup>
          </FormControl>
        );
      default:
        return null; // Handle invalid or empty type
    }
  };

  const formElementStyle = { marginBottom: "20px" };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Entry</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={formElementStyle}
        />
        <InputLabel style={formElementStyle}>Date</InputLabel>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={formElementStyle}
        />
        <TextField
          fullWidth
          label="Specialist"
          variant="outlined"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          style={formElementStyle}
        />
        <div style={formElementStyle}>{SpecificToEntry(type)}</div>
        <FormGroup style={formElementStyle}>
          <p>Diagnosis Codes</p>
          {diagnoses.map((diagnosis) => (
            <FormControlLabel
              key={diagnosis.code}
              control={
                <Checkbox
                  checked={diagnosisCodes.includes(diagnosis.code)}
                  onChange={() => handleDiagnosisCodeChange(diagnosis.code)}
                />
              }
              label={`${diagnosis.code} - ${diagnosis.name}`}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddEntry}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EntryForm;