import { useState } from "react";
import { 
  Box, Button, Modal, TextField, Typography, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";
import Header from "../../components/Header";

const Goals = () => {
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [goalText, setGoalText] = useState("");
  const [activities, setActivities] = useState("");
  const [goals, setGoals] = useState([]);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const getEstimatedDuration = (activities) => {
    const words = activities.split(" ").length;
    if (words < 10) return "7 Days";
    if (words < 20) return "14 Days";
    return "30 Days";
  };

  const handleNextStep = () => {
    if (step === 1 && goalText.trim() !== "") {
      setStep(2);
    } else if (step === 2 && activities.trim() !== "") {
      addGoal();
    }
  };

  const addGoal = () => {
    const estimatedDuration = getEstimatedDuration(activities);

    const newGoal = {
      id: goals.length + 1,
      name: goalText,
      activities,
      duration: estimatedDuration,
      status: "In Progress",
      progress: Math.floor(Math.random() * 100) + 1,
    };

    setGoals([...goals, newGoal]);
    setGoalText("");
    setActivities("");
    setStep(1);
    setOpen(false);
  };

  const handleDeleteGoal = () => {
    setGoals(goals.filter((goal) => goal.id !== goalToDelete));
    setGoalToDelete(null);
    setDeleteModalOpen(false);
  };

  return (
    <Box>
      <Header title="GOALS" subTitle="Managing your goals effectively" />

      <Box my={2}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Goal
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Goal</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.id}>
                <TableCell>{goal.id}</TableCell>
                <TableCell>{goal.name}</TableCell>
                <TableCell>
                  <Box
                    sx={{ 
                      px: 2, py: 1, 
                      bgcolor: goal.status === "Completed" ? "green" : "orange", 
                      color: "white", 
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {goal.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={goal.progress} sx={{ width: "100%" }} />
                </TableCell>
                <TableCell>{goal.duration}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => {
                      setGoalToDelete(goal.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* مودال إضافة الهدف */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "60%",
            height: "50vh",
            bgcolor: "#1e1e1e",
            color: "white",
            p: 4,
            mx: "auto",
            mt: "10vh",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {step === 1 ? (
            <>
              <Typography variant="h5">What goal do you want to achieve?</Typography>
              <TextField
                label="Your Goal"
                fullWidth
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                sx={{ input: { color: "white" }, label: { color: "gray" } }}
              />
            </>
          ) : (
            <>
              <Typography variant="h5">What are your daily and weekly activities?</Typography>
              <TextField
                label="Your Activities"
                fullWidth
                multiline
                rows={3}
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                sx={{ input: { color: "white" }, label: { color: "gray" } }}
              />
            </>
          )}
          <Button variant="contained" onClick={handleNextStep}>
            {step === 1 ? "Next" : "Submit"}
          </Button>
        </Box>
      </Modal>

      {/* مودال تأكيد حذف الهدف */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box
          sx={{
            width: "50%",
            bgcolor: "#1e1e1e",
            color: "white",
            p: 6,
            mx: "auto",
            mt: "20vh",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Are you sure you want to delete this goal?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="error" onClick={handleDeleteGoal}>
              Yes, Delete
            </Button>
            <Button variant="contained" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Goals;
