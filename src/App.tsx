import { useState, FormEvent } from "react";
import { imgbbUpload } from "imgbb-image-uploader";
import CustomDropZone from "./components/CustomDropZone";

import { FaSpinner } from "react-icons/fa";

import { Toaster, toast } from "react-hot-toast";

interface FromData {
  loading: boolean;
  name?: string;
  image: File | null;
  expiration?: null | number;
}

const App = () => {
  const [formData, setFormData] = useState<FromData>({
    loading: false,
    name: "",
    image: null,
    expiration: 300000,
  });

  const setImage = (image: File | null) => {
    console.log(image?.name);

    setFormData({
      ...formData,
      name: image?.name,
      image,
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      setFormData({
        ...formData,
        loading: true,
      });
      if (formData.image) {
        const { data } = await imgbbUpload({
          image: formData.image,
          key: "0807eea7499eb0040ce1a0cdd7ec7abc",
          expiration: formData?.expiration,
          name: formData.name,
        });
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-md"
                      src={data?.thumb?.url}
                      alt={data?.title}
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Your Image has been uploaded.
                    </p>
                    <a
                      target="_blank"
                      href={data?.url_viewer}
                      className="mt-1 text-sm font-bold text-blue-500"
                    >
                      Click Here to see
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ),
          {
            duration: 5000,
          }
        );
        setFormData({
          image: null,
          expiration: 300000,
          name: "",
          loading: false,
        });
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
      setFormData({
        ...formData,
        loading: false,
      });
    }
  };
  return (
    <>
      <Toaster />
      <div className="p-4 w-full max-w-4xl mx-auto min-h-d-screen flex items-center justify-center">
        {formData.image ? (
          <form
            onSubmit={submit}
            className="w-full flex flex-col gap-4 items-start"
          >
            <img
              src={URL.createObjectURL(formData.image)}
              alt={formData.image.type}
              className="object-contain p-2 h-96 aspect-square md:aspect-auto md:h-[500px] w-full bg-gray-200 rounded-md"
            />
            <div className="w-full">
              <label
                htmlFor="file_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                File name:
              </label>
              <input
                type="text"
                id="file_name"
                disabled={formData.loading}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
                placeholder="Enter your file name"
                value={formData?.name}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    name: target.value,
                  })
                }
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="upload-expiration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Expire time:
              </label>
              <select
                name="upload-expiration"
                id="upload-expiration"
                disabled={formData.loading}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-50"
                value={formData?.expiration?.toString()}
                onChange={({ target }) =>
                  setFormData({
                    ...formData,
                    expiration: Number(target.value),
                  })
                }
              >
                <option value={300000}>After 5 minutes (300000ms)</option>
                <option value={900000}>After 15 minutes (900000ms)</option>
                <option value={1800000}>After 30 minutes (1800000ms)</option>
                <option value={3600000}>After 1 hour (3600000ms)</option>
                <option value={10800000}>After 3 hours (10800000ms)</option>
                <option value={21600000}>After 6 hours (21600000ms)</option>
                <option value={43200000}>After 12 hours (43200000ms)</option>
                <option value={86400000}>After 1 day (86400000ms)</option>
                <option value={172800000}>After 2 days (172800000ms)</option>
                <option value={259200000}>After 3 days (259200000ms)</option>
                <option value={345600000}>After 4 days (345600000ms)</option>
                <option value={432000000}>After 5 days (432000000ms)</option>
                <option value={518400000}>After 6 days (518400000ms)</option>
                <option value={604800000}>After 1 week (604800000ms)</option>
                <option value={1209600000}>After 2 weeks (1209600000ms)</option>
                <option value={1814400000}>After 3 weeks (1814400000ms)</option>
                <option value={2592000000}>After 1 month (2592000000ms)</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={formData.loading}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  disabled:opacity-50"
              >
                {formData.loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-3" />
                    Uploading....
                  </>
                ) : (
                  " Upload"
                )}
              </button>
              <button
                type="reset"
                disabled={formData.loading}
                onClick={() => setFormData({ ...formData, image: null })}
                className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900  disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </form>
        ) : (
          <CustomDropZone setImage={setImage} />
        )}
      </div>
    </>
  );
};

export default App;
