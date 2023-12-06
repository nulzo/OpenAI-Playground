import { Slider } from "@radix-ui/themes";
import Label from "../ui/label";
import Description from "../ui/description";

export default function SliderField({ label, register, field, description }) {
  return (
    <>
      <div className="flex justify-between">
        <Label>{label}</Label>
        {/* <Label>{total / 100}</Label> */}
      </div>
      <div className="">
        <Slider
          // onValueChange={(value) => {
          //   setSlider([value]);
          // }}
        />
      </div>
      <Description>{description}</Description>
    </>
  );
}
