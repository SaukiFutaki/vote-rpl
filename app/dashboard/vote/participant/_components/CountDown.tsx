import { Badge } from "@/components/ui/badge";
import React from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

const CountdownComponent = ({ targetDate }: { targetDate: Date }) => {
  // Renderer untuk output kustom
  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return <>
            <Badge variant={"destructive"}>Voting telah berakhir</Badge>
      </>
    } else {
      return (
        <div className="flex justify-center space-x-2 text-lg font-bold">
          <div>
            <span>{days}</span>
            <span> Hari</span>
          </div>
          <div>
            <span>{hours}</span>
            <span> Jam</span>
          </div>
          <div>
            <span>{minutes}</span>
            <span> Menit</span>
          </div>
          <div>
            <span>{seconds}</span>
            <span> Detik</span>
          </div>
        </div>
      );
    }
  };

  return (
    <Countdown
      date={targetDate} // Target waktu
      renderer={renderer} // Renderer kustom
    />
  );
};

export default CountdownComponent;
