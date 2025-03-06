import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete, DragHandle } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "../../components/Header";

const Tasks = ({ goal }) => {
  const [tasks, setTasks] = useState(goal.tasks || []);
  const [taskText, setTaskText] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null); // تخزين ID المهمة عند طلب الحذف

  const getEstimatedTime = (task) => {
    const words = task.split(" ").length;
    if (words < 5) return "10 min";
    if (words < 10) return "30 min";
    if (words < 20) return "1 hour";
    return "2+ hours";
  };

  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask = {
      id: tasks.length + 1,
      text: taskText,
      time: getEstimatedTime(taskText),
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setOpen(false);
  };

  const confirmDeleteTask = (id) => {
    setDeleteTaskId(id); // فتح المودال بحذف المهمة المحددة
  };

  const removeTask = () => {
    setTasks(tasks.filter((task) => task.id !== deleteTaskId));
    setDeleteTaskId(null); // إغلاق المودال
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <Box>
      <Header title="Task Manager" subTitle={`Manage tasks for "${goal.name}"`} />

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Task
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps} component={Paper} sx={{ mt: 2, p: 2 }}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      secondaryAction={
                        <IconButton edge="end" color="error" onClick={() => confirmDeleteTask(task.id)}>
                          <Delete />
                        </IconButton>
                      }
                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <Box {...provided.dragHandleProps} sx={{ display: "flex", alignItems: "center" }}>
                        <DragHandle sx={{ mr: 2 }} />
                        <ListItemText primary={task.text} secondary={`Time: ${task.time}`} />
                      </Box>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      {/* مودال إضافة مهمة جديدة */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "50%",
            bgcolor: "#1e1e1e",
            color: "white",
            p: 4,
            mx: "auto",
            mt: "20vh",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>Add a new task</Typography>
          <TextField
            label="Task Description"
            fullWidth
            multiline
            rows={3}
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            sx={{ input: { color: "white" }, label: { color: "gray" } }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={addTask}>
            Add Task
          </Button>
        </Box>
      </Modal>

      {/* مودال تأكيد الحذف */}
      <Modal open={!!deleteTaskId} onClose={() => setDeleteTaskId(null)}>
        <Box
          sx={{
            width: "30%",
            bgcolor: "#1e1e1e",
            color: "white",
            p: 4,
            mx: "auto",
            mt: "30vh",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>هل أنت متأكد من حذف هذه المهمة؟</Typography>
          <Button variant="contained" color="error" sx={{ mr: 2 }} onClick={removeTask}>
            نعم، حذف
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setDeleteTaskId(null)}>
            إلغاء
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Tasks;
