
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define the form schema
const formSchema = z.object({
  employeeName: z.string().min(1, "Họ tên không được để trống"),
  type: z.enum(["leave", "out"]),
  startDate: z.string().min(1, "Ngày bắt đầu không được để trống"),
  endDate: z.string().min(1, "Ngày kết thúc không được để trống"),
  startTime: z.string().min(1, "Giờ bắt đầu không được để trống"),
  endTime: z.string().min(1, "Giờ kết thúc không được để trống"),
  reason: z.string().min(1, "Lý do không được để trống")
});

type FormValues = z.infer<typeof formSchema>;

interface NewRequestFormProps {
  onSubmit: (data: FormValues) => void;
  disableEmployeeSelection?: boolean;
}

export const NewRequestForm = ({ onSubmit, disableEmployeeSelection = false }: NewRequestFormProps) => {
  const currentUserName = (() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return "";
    const user = JSON.parse(userStr);
    return user.name;
  })();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: currentUserName,
      type: "leave",
      startDate: "",
      endDate: "",
      startTime: "08:00",
      endTime: "17:30",
      reason: ""
    }
  });

  const type = form.watch("type");
  
  // Validate form data and submit
  const handleFormSubmit = (data: FormValues) => {
    // Validate dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    
    if (endDate < startDate) {
      form.setError("endDate", {
        type: "manual",
        message: "Ngày kết thúc phải sau ngày bắt đầu"
      });
      return;
    }
    
    onSubmit(data);
  };
  
  // Get today's date for min attribute
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 mt-6">
        <FormField
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ tên</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nhập họ tên" 
                  {...field} 
                  disabled={disableEmployeeSelection}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Loại yêu cầu</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="leave" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Nghỉ phép
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="out" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Ra ngoài
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Input type="date" min={today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Input type="date" min={form.watch("startDate") || today} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ bắt đầu</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ kết thúc</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lý do</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={type === "leave" ? "Nghỉ phép thường niên..." : "Gặp khách hàng..."}
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit">Gửi yêu cầu</Button>
        </div>
      </form>
    </Form>
  );
};
