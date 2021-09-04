// import { useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetUpList from "../components/meetups/MeetupList";
import { Fragment } from "react";
const DUMMY_MEETUP = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "http://unsplash.it/650/731",
    address: "Some Address 5, 122423 City",
    discription: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "http://unsplash.it/651/730",
    address: "Some Address 8, 938 City",
    discription: "This is a second meetup",
  },
];
const HomePage = (props) => {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);

  //   useEffect(() => {
  //     setLoadedMeetups(DUMMY_MEETUP);
  //   }, []);
  //   return <MeetUpList meetups={loadedMeetups} />;
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of heighly active React meetups!"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />;
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:6Yr6OLouQpYH0x6e@cluster0.riuzs.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    // as this is a static page generation, we can ask server to re-generate the page using property name 'revalidate',
    // for which we can pass value in seconds
    revalidate: 120,
  };
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUP,
//         },
//     };
// }

export default HomePage;
