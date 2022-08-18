import PageSection from "../pageSection";
const DescriptionSection = ({ text }) => {
  return (
    <PageSection title={"Description"}>
      <div className="description">{text}</div>
    </PageSection>
  );
};

export default DescriptionSection;
