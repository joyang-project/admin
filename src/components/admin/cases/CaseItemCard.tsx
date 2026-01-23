import { GripVertical, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ReactDOM from 'react-dom'

interface CaseItemCardProps {
  item: any;
  provided: any;
  snapshot: any;
  onDelete: (id: string) => void;
}

export const CaseItemCard = ({ item, provided, snapshot, onDelete }: CaseItemCardProps) => {
  const useStyle = {
    ...provided.draggableProps.style,
    zIndex: snapshot.isDragging ? 9999 : 'auto',
    width: snapshot.isDragging ? provided.draggableProps.style?.width : '100%',
  };

  const cardContent = (
    <div 
      ref={provided.innerRef} 
      {...provided.draggableProps} 
      style={useStyle}
      className={`flex items-center justify-between p-3 sm:p-4 bg-background border rounded-xl shadow-sm ${
        snapshot.isDragging 
          ? 'border-primary ring-2 ring-primary/20 bg-accent shadow-2xl' 
          : 'hover:border-accent-foreground/10 transition-colors'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div 
          {...provided.dragHandleProps} 
          className="p-2 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
        >
          <GripVertical className="h-5 w-5" />
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pointer-events-none">
          <div className="h-12 w-16 sm:h-14 sm:w-20 bg-muted rounded-md overflow-hidden border border-border flex-shrink-0">
            <img 
              src={`http://localhost:4000${item.image_url}`} 
              className="w-full h-full object-cover" 
              alt="" 
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {item.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-bold uppercase">
                {item.service_type}
              </Badge>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                {item.location_tag}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!snapshot.isDragging && (
        <Button 
          onClick={() => onDelete(item.id)} 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-2"
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      )}
    </div>
  );

  if (snapshot.isDragging) {
    return ReactDOM.createPortal(cardContent, document.body);
  }

  return cardContent;
}