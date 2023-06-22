import EmptyDashboard from "../../assets/EmptyDashboard";
import ErrorPage from "../../assets/ErrorPage";
import Loader from "../../assets/Loader";

const DashboardTable = ({ posts, isLoading, error }) => {
  let element = null;

  if (error?.message) {
    return (
      <div className="h-full w-full flex justify-center items-center flex-col p-8">
        <ErrorPage />
        <h3 className="text-xl">{error?.message}</h3>
      </div>
    );
  }

  if (isLoading) {
    element = (
      <tr className="h-96">
        <th className="p-4">
          <div style={{ width: "250px" }}></div>
        </th>
        <th className="p-4">
          <div
            style={{ width: "500px" }}
            className="flex justify-center items-center"
          >
            <Loader />
          </div>
        </th>
        <th className="p-4">
          <div style={{ width: "250px" }}></div>
        </th>
      </tr>
    );
  } else if (!posts.length) {
    return (
      <div className="h-full w-full flex justify-center items-center flex-col p-8">
        <EmptyDashboard />
        <h3 className="text-xl">Not Result Found</h3>
      </div>
    );
  } else if (posts.length) {
    element = posts.map((post) => {
      return (
        <tr key={post.id} className="hover:bg-gray-100 cursor-pointer">
          <th className="p-4">
            <div
              className="flex justify-center items-center"
              style={{ width: "250px" }}
            >
              <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-medium">
                {post.title}
              </div>
            </div>
          </th>
          <th className="p-4">
            <div className="flex justify-center items-center">
              <p
                style={{ width: "500px" }}
                className="text-sm font-light text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {post.body}
              </p>
            </div>
          </th>
          <th className="p-4">
            <div className="flex justify-center items-center">
              <div style={{ width: "250px" }}>{post.userId}</div>
            </div>
          </th>
        </tr>
      );
    });
  }

  return (
    <div className="overflow-auto">
      <table className="min-w-full ">
        <thead className="bg-gray-50 border-y border-gray-300">
          <tr className=" font-medium">
            <th style={{ width: "250px" }} className="p-4 font-medium">
              Title
            </th>
            <th style={{ width: "500px" }} className="p-4 font-medium">
              Description
            </th>
            <th className="p-4 font-medium" style={{ width: "250px" }}>
              User
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">{element}</tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
