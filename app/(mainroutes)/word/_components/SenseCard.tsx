import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

const editSense = async (senseId: string, data: any) => {
  const response = await fetch(`/api/grand/sense/edit/${senseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to edit sense");
  }
  return response.json();
};

const SenseCard = ({
  sense,
  handleEditSense,
  posData,
  registerData,
  nameEntityData,
  domainData,
}: {
  sense: any;
  handleEditSense: (sense: any) => void;
  posData: any[];
  registerData: any[];
  nameEntityData: any[];
  domainData: any[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: any) => editSense(sense.id, data),
    onSuccess: () => {
      // Handle success (e.g., show notification)
      console.log("Sense edited successfully");
    },
  });

  // Find the corresponding type names from the IDs
  const posType = posData.find((pos) => pos.id === sense.posId)?.type;
  const registerType = registerData.find(
    (reg) => reg.id === sense.registerId,
  )?.type;
  const nameEntityType = nameEntityData.find(
    (ne) => ne.id === sense.name_entityId,
  )?.type;
  const domains = sense.domainIds
    ?.map((id: string) => domainData.find((domain) => domain.id === id)?.text)
    .filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 font-monlam">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <div
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="text-lg font-medium mb-2">
              འགྲེལ་བ། {sense.description}
            </h3>
            {sense.example_sentence && (
              <p className="text-gray-600 mb-2">
                དཔེར་བརྗོད། {sense.example_sentence}
              </p>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                <p>བརྡ་སྤྲོད་དབྱེ་བའི་སྡེ་ཚན། {posType}</p>
                <p>སྤྱོད་སྒོ། {registerType}</p>
                <p>མིང་གི་རྣམ་གྲངས། {nameEntityType}</p>
                {domains?.length > 0 && (
                  <p>བརྡ་ཆད་དབྱེ་བའི་སྡེ་ཚན། {domains.join(", ")}</p>
                )}
                {sense.has_illustration && (
                  <p className="col-span-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                    པར་རིས་དགོས།
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => handleEditSense(sense)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Edit sense"
        >
          <FaEdit className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default SenseCard;
