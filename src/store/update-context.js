import { createContext, useState } from "react";

export const MeetupContext = createContext({
  meetups: [],
  updateMeetups: () => {},
});

function MeetupContextProvider(props) {
  const [meetups, setMeetups] = useState(null);

  const updateMeetups = (ms) => {
    setMeetups(ms);
  };
  const context = {
    meetups,
    updateMeetups,
  };
  return (
    <MeetupContext.Provider value={context}>
      {props.children}
    </MeetupContext.Provider>
  );
}

export default MeetupContextProvider;
