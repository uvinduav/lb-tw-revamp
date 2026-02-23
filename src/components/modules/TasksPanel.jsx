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
        className={`flex items-start gap-3 px-4 py-3 border-b border-border-subtle cursor-pointer transition-all duration-200 hover:bg-bg-subtle ${isVisuallyCompleted ? 'opacity-50' : ''} ${isTransitioning ? 'opacity-30' : ''}`}
        onClick={() => toggleTask(task.id)}
      >
        <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            className="w-4 h-4 accent-primary cursor-pointer"
            checked={isVisuallyCompleted}
            onChange={() => toggleTask(task.id)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[13px] font-medium text-text-main m-0 ${isVisuallyCompleted ? 'line-through text-text-secondary' : ''}`}>{task.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-text-secondary">
              <Calendar size={12} />
              {task.dueDate}
            </span>
            <span className="text-[10px] font-medium text-text-tertiary bg-bg-subtle px-1.5 py-0.5 rounded">
              {task.category === 'my-tasks' ? 'Personal' : 'Assigned'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SlidingPanel isOpen={isOpen} onClose={onClose} title="Tasks" width="400px">
      <div className="-m-6">
        <div className="border-b border-border px-4 pt-2">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-2 text-[13px] font-medium border-none cursor-pointer transition-all duration-200 rounded-t ${activeTab === tab.id ? 'text-primary-action bg-bg-subtle border-b-2 border-b-primary-action' : 'text-text-secondary bg-transparent hover:text-text-main'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="text-text-tertiary ml-1">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 border-b border-border">
          {!isAddingTask ? (
            <button className="flex items-center gap-2 text-[13px] font-medium text-primary-action bg-transparent border border-dashed border-primary-action/30 rounded px-3 py-2 w-full cursor-pointer hover:bg-primary-action/5 transition-all duration-200" onClick={() => setIsAddingTask(true)}>
              <Plus size={16} />
              Add task
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="w-full border border-border rounded px-3 py-2 text-[13px] outline-none focus:border-primary-action"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-[12px] text-text-secondary bg-transparent border border-border rounded px-2 py-1 cursor-pointer hover:bg-bg-subtle" title="Add Date">
                  <Calendar size={14} />
                  <span>{newTaskDate || 'Date'}</span>
                </button>
                <button className="flex items-center gap-1 text-[12px] text-text-secondary bg-transparent border border-border rounded px-2 py-1 cursor-pointer hover:bg-bg-subtle" title="Add Time">
                  <Clock size={14} />
                  <span>Time</span>
                </button>
                <button className="flex items-center gap-1 text-[12px] text-text-secondary bg-transparent border border-border rounded px-2 py-1 cursor-pointer hover:bg-bg-subtle" title="Assign Person">
                  <User size={14} />
                  <span>Assign</span>
                </button>
              </div>
              <div className="flex justify-end gap-2 mt-1">
                <button 
                  className="px-3 py-1.5 text-[13px] text-text-secondary bg-transparent border border-border rounded cursor-pointer hover:bg-bg-subtle" 
                  onClick={() => setIsAddingTask(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 py-1.5 text-[13px] text-white bg-primary-action border-none rounded cursor-pointer hover:bg-primary-action-hover disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={handleAddTask}
                  disabled={!newTaskTitle.trim()}
                >
                  Add task
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          {uncompletedTasks.length > 0 ? (
            uncompletedTasks.map(task => renderTaskItem(task))
          ) : (
             <div className="py-10 text-center text-text-secondary text-[13px]">
               <p>
                 {tasks.filter(t => activeTab === 'all' || t.category === activeTab).length > 0 
                   ? "All tasks completed! 🎉" 
                   : "No tasks yet. Add one above!"}
               </p>
             </div>
          )}
          
          {/* Completed Section */}
          {completedTasks.length > 0 && (
            <div className="border-t border-border">
              <button 
                className="flex items-center gap-2 w-full px-4 py-2.5 text-[13px] font-medium text-text-secondary bg-transparent border-none cursor-pointer hover:bg-bg-subtle" 
                onClick={() => setIsCompletedExpanded(!isCompletedExpanded)}
              >
                {isCompletedExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>Completed ({completedTasks.length})</span>
              </button>
              
              {isCompletedExpanded && (
                <div>
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
