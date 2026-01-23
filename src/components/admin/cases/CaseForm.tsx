import { Plus, ImageIcon, Loader2, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RefObject } from 'react'

interface CaseFormProps {
  formData: {
    title: string;
    service_type: string;
    location_tag: string;
    description: string;
  };
  setFormData: (data: any) => void;
  previewUrl: string | null;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  handleSubmit: () => void;
  isLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const CaseForm = ({
  formData,
  setFormData,
  previewUrl,
  setFile,
  setPreviewUrl,
  handleSubmit,
  isLoading,
  fileInputRef
}: CaseFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(selectedFile)
    }
  }

  return (
    <div className="space-y-5 py-2">
      <div className="space-y-2">
        <Label htmlFor="service-type">시공 구분</Label>
        <Select value={formData.service_type} onValueChange={(v) => setFormData({...formData, service_type: v})}>
          <SelectTrigger id="service-type" className="w-full">
            <SelectValue placeholder="구분 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="가정용">가정용</SelectItem>
            <SelectItem value="업소용">업소용</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="title">시공 명칭</Label>
        <Input 
          id="title"
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
          placeholder="예: 수성구 아파트 시공" 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">위치 태그</Label>
        <Input 
          id="location"
          value={formData.location_tag} 
          onChange={(e) => setFormData({...formData, location_tag: e.target.value})} 
          placeholder="예: 대구 수성구" 
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">상세 설명</Label>
        <Textarea 
          id="description"
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          placeholder="시공 장비나 특징을 입력하세요"
          className="resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>시공 사진</Label>
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        {!previewUrl ? (
          <div 
            onClick={() => fileInputRef.current?.click()} 
            className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg p-10 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer group"
          >
            <ImageIcon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
            <p className="mt-2 text-sm font-medium text-muted-foreground">클릭하여 이미지 업로드</p>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden border bg-muted aspect-video shadow-sm">
            <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 h-7 w-7 rounded-full shadow-lg"
              onClick={(e) => { e.stopPropagation(); setFile(null); setPreviewUrl(null); }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Button onClick={handleSubmit} disabled={isLoading} className="w-full font-semibold">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
        등록 완료
      </Button>
    </div>
  )
}