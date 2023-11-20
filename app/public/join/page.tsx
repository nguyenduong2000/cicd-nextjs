const Join = () => {
  const googleFormId =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_ID ||
    '1FAIpQLScZt3UHPKkdbwkk4iyAmZd3B7ADrc-m3YpSfE4eG-_23zP9cg';
  return (
    <>
      <div className={'text-black container-content'}>
        <div className={'mx-auto md:w-fit mt-[50px] google-form'}>
          <iframe
            src={`https://docs.google.com/forms/d/e/${googleFormId}/viewform?embedded=true`}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </>
  );
};

export default Join;
