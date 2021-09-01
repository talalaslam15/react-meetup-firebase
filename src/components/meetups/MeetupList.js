import MeetupItem from "./MeetupItem";

function MeetupList(props) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          date={meetup.date}
          description={meetup.description}
          created={meetup.created}
          onDeleteComplete={props.onDeleteComplete}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
