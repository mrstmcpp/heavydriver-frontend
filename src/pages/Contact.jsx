import { PageTopBanner } from '../components/PageTopBanner';
import CustomInput from '../resusables/CustomInput';
import OutlinedButton from '../resusables/OutlinedButton';
import YellowButton from '../resusables/YellowButton';

const Contact = () => {
  return (
    <div>
      <PageTopBanner title="Contact Us" />
      <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Form */}
          <div>
            <h5 className="uppercase text-yellow-400 tracking-widest mb-2">Send us email</h5>
            <h2 className="text-4xl font-bold mb-8 font-serif">Feel free to write</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomInput placeholder="Enter Name" />
              <CustomInput placeholder="Enter Email" type="email" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomInput placeholder="Enter Subject" />
              <CustomInput placeholder="Enter Phone" icon="pi-phone" />
            </div>

            <div className="mb-6">
              <CustomInput
                placeholder="Enter Message"
                type="textarea"
                rows={5}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <YellowButton>Send message</YellowButton>
              <OutlinedButton onClick={() => console.log('Reset form')}>
                Reset
              </OutlinedButton>
            </div>
          </div>

          {/* Right Info */}
          <div>
            <h5 className="uppercase text-yellow-400 tracking-widest mb-2">Need any help?</h5>
            <h2 className="text-4xl font-bold mb-6 font-serif">Get in touch with us</h2>
            <p className="text-gray-400 mb-10">
              Lorem ipsum is simply free text available dolor sit amet consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black p-4 rounded-md text-xl">
                  <i className="pi pi-phone" />
                </div>
                <div>
                  <h4 className="font-semibold">Have any question?</h4>
                  <p className="text-gray-300">Free +92 (020)-9850</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black p-4 rounded-md text-xl">
                  <i className="pi pi-envelope" />
                </div>
                <div>
                  <h4 className="font-semibold">Write email</h4>
                  <p className="text-gray-300">needhelp@company.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black p-4 rounded-md text-xl">
                  <i className="pi pi-map-marker" />
                </div>
                <div>
                  <h4 className="font-semibold">Visit anytime</h4>
                  <p className="text-gray-300">66 Brooklyn Golden Street, New York</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
