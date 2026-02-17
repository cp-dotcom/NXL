
import {
    Plus,
    Layout,
} from 'lucide-react';
// import { cn } from '../../utils/utils';
import { Button } from '../ui/button';

// const TabItem = ({ icon: Icon, label, active, count }) => (
//     <div className={cn(
//         "flex items-center gap-2 px-3 py-2 border-b-2 border-transparent cursor-pointer hover:bg-accent/50 transition-all",
//         active && "border-blue-500 text-blue-600"
//     )}>
//         <Icon size={16} />
//         <span className="text-sm border-grey-500">{label}</span>
//         {count && <span className="text-[10px] bg-accent px-1.5 rounded-full text-muted-foreground">{count}</span>}
//     </div>
// );

export default function BoardHeader({ onAddTask }) {
    return (
        <div className="pt-6 px-6 flex flex-col gap-4">


            {/* Board Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Main Tasks</h1>

                </div>

                <div className="flex items-center gap-2">
                    <Button size="sm" className="flex-1 md:flex-none rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold h-10 md:h-9" onClick={onAddTask}>
                        <Plus size={16} className="mr-2" />
                        Add Task
                    </Button>
                </div>
            </div>

            {/* View Tabs - Simplified */}
            <div className="flex items-center gap-6 border-b mt-2">
                <div className="flex items-center gap-2 px-1 py-3 border-b-2 border-primary text-primary font-medium cursor-pointer">
                    <Layout size={18} />
                    <span className="text-sm">Board View</span>
                </div>

            </div>
        </div>
    );
}
