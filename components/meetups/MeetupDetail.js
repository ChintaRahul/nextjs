import classes from "./MeetupDetail.module.css";
const MeetupDetail = (props) => {
  const { img, desc, title, addr } = props;
  return (
    <section className={classes.detail}>
      <img src={img} alt={title} />
      <h1>{title}</h1>
      <p>{desc}</p>
      <address>{addr}</address>
    </section>
  );
};

export default MeetupDetail;
