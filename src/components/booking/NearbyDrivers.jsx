import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { Rating } from "primereact/rating";

function NearbyDrivers({ drivers }) {
  return (
    <div className=" text-white">
      <div className="max-w-3xl mx-auto bg-[#0f0f0f] p-8 rounded-2xl shadow-lg mt-10 mb-10 border border-gray-800">
        <h2 className="text-4xl text-center font-bold mb-6 text-yellow-400">
          Drivers Near You
        </h2>

        <p className="text-gray-400 text-center mb-8">
          These are the drivers currently available near your location within 5 km.
        </p>

        {drivers.map((driver, index) => (
          <div
            key={driver.driverId}
            className={classNames(
              "flex flex-col xl:flex-row xl:items-start p-4 gap-4 border-b border-gray-800 last:border-none"
            )}
          >
            {/* Driver Image */}
            <img
              className="w-20 h-20 shadow-md mx-auto rounded-full object-cover"
              src={`/drivers/driver.png`}
              alt={driver.name || `Driver ${driver.driverId}`}
            />

            {/* Driver Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-4">
              <div className="flex flex-col items-center sm:items-start gap-3">
                <div className="text-2xl font-bold">
                  Driver {driver.driverId}
                </div>
                <Rating value={driver.rating || 3} readOnly cancel={false} />
                <Tag className="bg-green-500" value={driver.status || "Available"} />
                <p className="text-gray-400">
                  Location:{" "}
                  {driver.latitude + " , " + driver.longitude || "Unknown"}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyDrivers;
