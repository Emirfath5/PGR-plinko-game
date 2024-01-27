import pixImg from '@images/pix.png';

export function Contribute() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-1/2 flex-col items-center justify-center">
        <h2 className="mb-4 flex items-center gap-2 text-center text-xl font-bold text-text">
          Support Our PFP Art and Community Project
        </h2>
        <p className="text-center text-text">
          We're building a PFP art-based and community-driven project, and your support means the world to us. Every contribution helps us grow and build an amazing community.
        </p>
        <h3 className="mb-2 text-center text-lg font-bold text-text">
          Scan or Click the QR Code to Contribute
        </h3>
        <figure>
          <a
            target="_blank"
            href="https://opensea.io/collection/baby-reapers"
            rel="noreferrer"
          >
            <img src={pixImg} alt="PIX QR Code" />
          </a>
        </figure>
        <div className="mt-4">
          <span className="block text-center text-sm font-bold text-text">
            Or Copy the PIX Key
          </span>
          <span className="block text-center text-xl font-bold text-purple">
https://opensea.io/collection/baby-reapers          </span>
        </div>
        <p className="mt-4 text-center text-text">
          Your contributions support the launch of Gen 2.
        <p className="mt-4 text-center text-text">
          Join us in shaping the future of our project through community votes. Holder voices matter, and your contribution directly impacts our growth and development.
        </p>
        <p className="mt-4 text-center text-purple font-bold">
          Thank you for being a part of our community!
        </p>
      </div>
    </div>
  );
}

