"use client";
import { useUser } from "@/context/userContext";
import { djangoImg } from "@/utils/api-helper";
import { Button } from "@nextui-org/button";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import Loading from "../ui/Loading/loading-overlay";

const ProfilePage = () => {
  const { user } = useUser();
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-lg rounded-xl p-8 laptop:min-h-[350px] max-w-lg w-full relative">
        {user ? (
          <>
            <button
              onClick={() => setEdit(!edit)}
              className="text-gray-500 absolute top-4 right-4"
            >
              <BiEdit className="w-4 h-4" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <Image
                  src={djangoImg(user.avatar)}
                  alt={user.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-gray-300"
                />
              </div>
            </div>
            {edit && (
              <div className="flex justify-center">
                <input
                  type="file"
                  className="text-gray-500 text-[12.5px] border border-gray-500 rounded"
                />
              </div>
            )}
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
              {user.name}
            </h2>
            <p className="text-center text-gray-600 mb-4">{user.email}</p>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">ID:</span>
                <span className="text-gray-800">{user.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Registered On:</span>
                <span className="text-gray-800">
                  {moment(user.date_joined).format("DD/MM/YYYY HH:mm:ss")}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Role:</span>
                <span className="text-gray-800">
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </div>
            {edit && (
              <>
                <div className="border-t border-gray-200 pt-4"></div>
                <div className="flex justify-center">
                  <Button>Save</Button>
                  <Button>Cancel</Button>
                </div>
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
