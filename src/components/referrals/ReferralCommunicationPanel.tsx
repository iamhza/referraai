import React, { useState } from 'react';
import { 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Calendar, 
  CheckSquare,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Task status types
type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
type UserRole = 'provider' | 'case_manager';

// Communication task interface
interface CommunicationTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  assignedTo: UserRole;
  dateCreated: string;
  lastUpdated?: string;
  comments: TaskComment[];
}

// Task comment interface
interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  timestamp: string;
}

const ReferralCommunicationPanel = ({ referralId }: { referralId: string }) => {
  const [tasks, setTasks] = useState<CommunicationTask[]>([
    {
      id: '1',
      title: 'Send initial intake paperwork',
      description: 'Provider needs to send intake forms to case manager.',
      status: 'completed',
      dueDate: '2025-04-15',
      assignedTo: 'provider' as UserRole,
      dateCreated: '2025-04-12',
      lastUpdated: '2025-04-13',
      comments: [
        {
          id: 'c1',
          userId: 'p1',
          userName: 'Minnesota Care Center',
          userRole: 'provider' as UserRole,
          content: 'Forms have been sent via email. Please confirm receipt.',
          timestamp: '2025-04-13T10:30:00Z'
        },
        {
          id: 'c2',
          userId: 'cm1',
          userName: 'Sarah Johnson',
          userRole: 'case_manager' as UserRole,
          content: 'Received, thank you!',
          timestamp: '2025-04-13T14:15:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'Schedule initial assessment',
      description: 'Set up the first appointment for client assessment.',
      status: 'in_progress',
      dueDate: '2025-04-20',
      assignedTo: 'case_manager' as UserRole,
      dateCreated: '2025-04-12',
      comments: [
        {
          id: 'c3',
          userId: 'cm1',
          userName: 'Sarah Johnson',
          userRole: 'case_manager' as UserRole,
          content: 'Working on coordinating a time that works for the client. Will update soon.',
          timestamp: '2025-04-14T09:45:00Z'
        }
      ]
    },
    {
      id: '3',
      title: 'Complete service agreement',
      description: 'Provider needs to submit service agreement documentation.',
      status: 'pending',
      dueDate: '2025-04-25',
      assignedTo: 'provider' as UserRole,
      dateCreated: '2025-04-12',
      comments: []
    },
    {
      id: '4',
      title: 'Submit insurance verification',
      description: 'Provider needs to verify client insurance and submit documentation.',
      status: 'blocked',
      dueDate: '2025-04-18',
      assignedTo: 'provider' as UserRole,
      dateCreated: '2025-04-12',
      comments: [
        {
          id: 'c4',
          userId: 'p1',
          userName: 'Minnesota Care Center',
          userRole: 'provider' as UserRole,
          content: "We need the client's insurance member ID before we can proceed with verification.",
          timestamp: '2025-04-15T11:20:00Z'
        }
      ]
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [activeTask, setActiveTask] = useState<string>('1');
  
  // Calculate completion percentage
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const completionPercentage = Math.round((completedTasks / tasks.length) * 100);
  
  // Get the currently selected task
  const currentTask = tasks.find(task => task.id === activeTask);

  // Function to add a new comment to a task
  const addComment = () => {
    if (!newComment.trim() || !currentTask) return;
    
    const updatedTasks = tasks.map(task => {
      if (task.id === activeTask) {
        return {
          ...task,
          comments: [
            ...task.comments,
            {
              id: `c${Date.now()}`,
              userId: 'cm1',
              userName: 'Sarah Johnson',
              userRole: 'case_manager' as UserRole,
              content: newComment.trim(),
              timestamp: new Date().toISOString()
            }
          ],
          lastUpdated: new Date().toISOString()
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setNewComment('');
  };
  
  // Function to update task status
  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          lastUpdated: new Date().toISOString()
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };
  
  // Get badge color based on task status
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Get icon based on task status
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <Info className="h-4 w-4" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Tasks List Panel */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Collaboration Tasks</CardTitle>
          <CardDescription>Track your communication and tasks</CardDescription>
          <div className="mt-2">
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-sm text-gray-500 mt-1">{completedTasks} of {tasks.length} tasks completed</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {tasks.map((task) => (
              <button
                key={task.id}
                className={`w-full text-left p-4 transition-colors hover:bg-gray-50 border-l-4 ${
                  task.id === activeTask ? 'bg-gray-50 border-referra-500' : 'border-transparent'
                }`}
                onClick={() => setActiveTask(task.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {task.description}
                    </p>
                  </div>
                  <Badge className={`ml-2 ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    <span className="ml-1">
                      {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Due: {task.dueDate || 'N/A'}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Task Detail Panel */}
      <Card className="md:col-span-2">
        {currentTask ? (
          <>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{currentTask.title}</CardTitle>
                  <CardDescription className="mt-1">{currentTask.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(currentTask.status)}>
                  {getStatusIcon(currentTask.status)}
                  <span className="ml-1">
                    {currentTask.status.replace('_', ' ').charAt(0).toUpperCase() + currentTask.status.replace('_', ' ').slice(1)}
                  </span>
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Assigned to:</p>
                  <p className="font-medium">{currentTask.assignedTo === 'provider' ? 'Provider' : 'Case Manager'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due date:</p>
                  <p className="font-medium">{currentTask.dueDate || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Created:</p>
                  <p className="font-medium">{currentTask.dateCreated}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last updated:</p>
                  <p className="font-medium">{currentTask.lastUpdated || 'N/A'}</p>
                </div>
              </div>
              
              {currentTask.status === 'blocked' && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Blocked</AlertTitle>
                  <AlertDescription>
                    This task is currently blocked and needs attention.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-2 mt-4">
                <Button 
                  size="sm" 
                  variant={currentTask.status === 'completed' ? 'default' : 'outline'}
                  className={currentTask.status === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''}
                  onClick={() => updateTaskStatus(currentTask.id, 'completed')}
                >
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Mark Complete
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => updateTaskStatus(currentTask.id, 'in_progress')}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  In Progress
                </Button>
                
                {currentTask.status === 'blocked' ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateTaskStatus(currentTask.id, 'pending')}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Unblock
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => updateTaskStatus(currentTask.id, 'blocked')}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Block
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <Separator className="mb-4" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Comments ({currentTask.comments.length})</h3>
                
                {currentTask.comments.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <MessageSquare className="h-8 w-8 mx-auto opacity-20 mb-2" />
                    <p>No comments yet</p>
                    <p className="text-sm">Add a comment to start the conversation</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto p-2">
                    {currentTask.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar>
                          <div className={`${
                            comment.userRole === 'provider' 
                              ? 'bg-referra-100 text-referra-800' 
                              : 'bg-teal-100 text-teal-800'
                            } w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium`}>
                            {comment.userName.charAt(0)}
                          </div>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.userName}</span>
                            <Badge variant="outline" className="text-xs">
                              {comment.userRole === 'provider' ? 'Provider' : 'Case Manager'}
                            </Badge>
                          </div>
                          <p className="mt-1 text-gray-800">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4">
                  <Label htmlFor="comment">Add a comment</Label>
                  <Textarea 
                    id="comment"
                    placeholder="Type your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-1"
                  />
                  <Button 
                    className="mt-2 bg-referra-500 hover:bg-referra-600"
                    onClick={addComment}
                    disabled={!newComment.trim()}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-80">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto opacity-20 mb-2" />
              <h3 className="font-medium text-lg">No task selected</h3>
              <p className="text-gray-500">Select a task from the list to view details</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ReferralCommunicationPanel;
