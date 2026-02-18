import React, { useState } from 'react';
import SlidingPanel from '../common/SlidingPanel';
import { Calendar, Clock, User, Plus, ChevronDown, ChevronRight } from 'lucide-react';

const TasksPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review quarterly budget', category: 'my-tasks', dueDate: 'Today', completed: false },
    { id: 2, title: 'Approve pending invoices', category: 'my-tasks', dueDate: 'Tomorrow', completed: false },
    { id: 3, title: 'Update risk register', category: 'assigned', dueDate: 'Feb 24', completed: true },
  ]);

  // Add Task State
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [assignedPerson, setAssignedPerson] = useState('');
  
  // Completed Section State
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(false);
  
  // Transitioning State to handle the 0.5s delay
  const [transitioningTasks, setTransitioningTasks] = useState([]);

  const toggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (!task.completed) {
      // marking as completed: add to transitioning first
      setTransitioningTasks(prev => [...prev, taskId]);
      
      setTimeout(() => {
        setTasks(prevTasks => prevTasks.map(t => 
          t.id === taskId ? { ...t, completed: true } : t
        ));
        setTransitioningTasks(prev => prev.filter(id => id !== taskId));
      }, 500);
    } else {
      // uncompleting: do it immediately
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, completed: false } : t
      ));
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      category: 'my-tasks',
      dueDate: newTaskDate || 'Today',
      time: newTaskTime,
      assignee: assignedPerson,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    
    // Reset form
    setNewTaskTitle('');
    setNewTaskDate('');
    setNewTaskTime('');
    setAssignedPerson('');
    setIsAddingTask(false);
  };

  const getFilteredTasks = (isCompleted) => {
    return tasks.filter(task => {
      if (activeTab !== 'all' && task.category !== activeTab) return false;
      return task.completed === isCompleted;
    }).sort((a, b) => {
        return isCompleted ? b.id - a.id : 0; 
    });
  };

  const uncompletedTasks = getFilteredTasks(false);
  const completedTasks = getFilteredTasks(true);

  const getCount = (category) => {
    return tasks.filter(t => !t.completed && !transitioningTasks.includes(t.id) && (category === 'all' || t.category === category)).length;
  };

  const tabs = [
    { id: 'all', label: 'All', count: getCount('all') },
    { id: 'my-tasks', label: 'My tasks', count: getCount('my-tasks') },
    { id: 'assigned', label: 'Assigned to me', count: getCount('assigned') },
  ];

  const renderTaskItem = (task) => {
    const isTransitioning = transitioningTasks.includes(task.id);
    const isVisuallyCompleted = task.completed || isTransitioning;

    return (
      <div 
        key={task.id} 
        className={`task-item ${isVisuallyCompleted ? 'completed' : ''} ${isTransitioning ? 'transitioning' : ''}`}
        onClick={() => toggleTask(task.id)}
      >
        <div className="task-checkbox-container" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            className="task-real-checkbox"
            checked={isVisuallyCompleted}
            onChange={() => toggleTask(task.id)}
          />
        </div>
        <div className="task-info">
          <p className="task-title">{task.title}</p>
          <div className="task-meta">
            <span className="task-date">
              <Calendar size={12} />
              {task.dueDate}
            </span>
            <span className="task-category-label">
              {task.category === 'my-tasks' ? 'Personal' : 'Assigned'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SlidingPanel isOpen={isOpen} onClose={onClose} title="Tasks" width="400px">
      <div className="tasks-content">
        <div className="panel-tabs-wrapper">
          <div className="panel-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`panel-tab-item all ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="tab-count">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="add-task-section">
          {!isAddingTask ? (
            <button className="add-task-btn" onClick={() => setIsAddingTask(true)}>
              <Plus size={16} />
              Add task
            </button>
          ) : (
            <div className="add-task-form">
              <input
                type="text"
                className="add-task-input"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              <div className="add-task-options">
                <button className="option-btn" title="Add Date">
                  <Calendar size={14} />
                  <span>{newTaskDate || 'Date'}</span>
                </button>
                <button className="option-btn" title="Add Time">
                  <Clock size={14} />
                  <span>Time</span>
                </button>
                <button className="option-btn" title="Assign Person">
                  <User size={14} />
                  <span>Assign</span>
                </button>
              </div>
              <div className="add-task-actions">
                <button 
                  className="cancel-btn" 
                  onClick={() => setIsAddingTask(false)}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-add-btn" 
                  onClick={handleAddTask}
                  disabled={!newTaskTitle.trim()}
                >
                  Add task
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="tasks-list">
          {uncompletedTasks.length > 0 ? (
            uncompletedTasks.map(task => renderTaskItem(task))
          ) : (
             <div className="empty-tasks">
               <p>
                 {tasks.filter(t => activeTab === 'all' || t.category === activeTab).length > 0 
                   ? "All tasks completed! 🎉" 
                   : "No tasks yet. Add one above!"}
               </p>
             </div>
          )}
          
          {/* Completed Section */}
          {completedTasks.length > 0 && (
            <div className="completed-section">
              <button 
                className="completed-header" 
                onClick={() => setIsCompletedExpanded(!isCompletedExpanded)}
              >
                {isCompletedExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>Completed ({completedTasks.length})</span>
              </button>
              
              {isCompletedExpanded && (
                <div className="completed-tasks-list">
                  {completedTasks.map(task => renderTaskItem(task, true))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SlidingPanel>
  );
};

export default TasksPanel;
