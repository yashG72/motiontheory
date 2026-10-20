// The logo's "O with a line through it", used in place of the letter O in headlines
export default function OMark() {
  return (
    <>
      <span className="o-mark" aria-hidden="true"></span>
      <span className="sr">o</span>
    </>
  );
}
