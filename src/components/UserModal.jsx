import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
export default function UserModal({ isOpen, setIsOpen, newUser, setNewUser, handleSaveUser }) {
  const [roleError, setRoleError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  useEffect(() => {
    if (newUser.email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(newUser.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [newUser.email]);
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setNewUser({
      ...newUser,
      role: role,
    });
    setRoleError(role === "");
  };
  const handleSave = () => {
    if (!emailError && !roleError) {
      handleSaveUser();
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-10/12 md:w-1/2 p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">
            {newUser.email ? "Edit User" : "Add User"}
          </Dialog.Title>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Role</label>
            <select
              value={newUser.role}
              onChange={handleRoleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">--Select Role--</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="STAFF">Staff</option>
            </select>
            {roleError && (
              <p className="text-red-500 text-sm mt-1">Please select a valid role.</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`bg-blue-600 text-white py-2 px-4 rounded ${emailError || roleError ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={emailError || roleError} // Disable the Save button if there's an error
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}