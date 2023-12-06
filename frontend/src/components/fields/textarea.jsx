import { Text, TextArea } from "@radix-ui/themes";
import Label from "../ui/label";
import Description from "../ui/description";

export default function TextareaField({
  label,
  error,
  placeholder,
  register,
  field,
  description,
}) {
  return (
    <>
      <Label>{label}</Label>
      <TextArea
        {...register(field)}
        placeholder={placeholder}
        className={`h-48 text-muted-foreground`}
      />
      <Description>{description}</Description>
    </>
  );
}
