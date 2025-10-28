import { useState } from "react";
import { PageTopBanner } from "../components/PageTopBanner";
import CustomInput from "../resusables/CustomInput";
import OutlinedButton from "../resusables/OutlinedButton";
import YellowButton from "../resusables/YellowButton";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // TODO: API integration
  };

  return (
    <div>
      <PageTopBanner section="Contact Us" />

      <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Form */}
          <div>
            <h5 className="uppercase text-yellow-400 tracking-widest mb-2">Send us email</h5>
            <h2 className="text-4xl font-bold mb-8 font-serif">Feel free to write</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomInput
                label="Name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange("name")}
              />
              <CustomInput
                label="Email"
                placeholder="Enter Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <CustomInput
                label="Subject"
                placeholder="Enter Subject"
                value={formData.subject}
                onChange={handleChange("subject")}
              />
              <CustomInput
                label="Phone"
                placeholder="Enter Phone"
                icon="pi-phone"
                value={formData.phone}
                onChange={handleChange("phone")}
              />
            </div>

            <div className="mb-6">
              <CustomInput
                label="Message"
                placeholder="Enter Message"
                type="textarea"
                rows={5}
                value={formData.message}
                onChange={handleChange("message")}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <YellowButton onClick={handleSubmit}>Send message</YellowButton>
              <OutlinedButton onClick={handleReset}>Reset</OutlinedButton>
            </div>
          </div>

          {/* Right Info */}
          <div>
            <h5 className="uppercase text-yellow-400 tracking-widest mb-2">Need any help?</h5>
            <h2 className="text-4xl font-bold mb-6 font-serif">Get in touch with us</h2>
            <p className="text-gray-400 mb-10">
              Lorem ipsum is simply free text available dolor sit amet consectetur notted
              adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black p-4 rounded-md text-xl">
                  <i className="pi pi-phone" />
                </div>
                <div>
                  <h4 className="font-semibold">Have any question?</h4>
                  <p className="text-gray-300">Free +91 000000000</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black p-4 rounded-md text-xl">
                  <i className="pi pi-envelope" />
                </div>
                <div>
                  <h4 className="font-semibold">Write email</h4>
                  <p className="text-gray-300">satyamprajapati2k3@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 text-black p-4 rounded-md text-xl">
                  <i className="pi pi-map-marker" />
                </div>
                <div>
                  <h4 className="font-semibold">Visit anytime</h4>
                  <p className="text-gray-300">
                    0, NBH-C, MNNIT Campus, Prayagraj, Uttar Pradesh, India
                  </p>
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
