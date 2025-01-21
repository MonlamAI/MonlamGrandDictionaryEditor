"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { GroupedLabel, Label, LabelSelectorProps } from "../_types/type";

const LabelSelector: React.FC<LabelSelectorProps> = ({
  onSelectionChange,
  initialSelected = [],
  domains,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSelected && initialSelected.length > 0) {
      const initialLabels = domains.filter((label) =>
        initialSelected.includes(label.id),
      );
      setSelectedLabels(initialLabels);
    }
  }, [initialSelected, domains]);

  const groupedItems = useMemo(() => {
    const grouped: Record<string, GroupedLabel> = {};
    domains.forEach((item) => {
      if (!item.parent_id) {
        grouped[item.id] = { ...item, children: [] };
      } else if (grouped[item.parent_id]) {
        grouped[item.parent_id].children.push(item);
      }
    });
    return grouped;
  }, [domains]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = useMemo(() => {
    return Object.values(groupedItems).filter((item) => {
      const matchesParent = item.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesChildren = item.children.some((child) =>
        child.text.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return matchesParent || matchesChildren;
    });
  }, [groupedItems, searchTerm]);

  const isSelected = useCallback(
    (label: Label): boolean => {
      return selectedLabels.some((l) => l.id === label.id);
    },
    [selectedLabels],
  );

  const isParentSelected = useCallback(
    (parentId: string | null): boolean => {
      if (!parentId) return true;
      return selectedLabels.some((l) => l.id === parentId);
    },
    [selectedLabels],
  );

  const toggleLabel = useCallback(
    (label: Label) => {
      if (disabled) return;
      if (label.parent_id && !isParentSelected(label.parent_id)) {
        return;
      }

      setSelectedLabels((prev) => {
        const isCurrentlySelected = prev.some((l) => l.id === label.id);
        let newSelection: Label[];

        if (isCurrentlySelected) {
          if (!label.parent_id) {
            newSelection = prev.filter(
              (l) => l.id !== label.id && l.parent_id !== label.id,
            );
          } else {
            newSelection = prev.filter((l) => l.id !== label.id);
          }
        } else {
          newSelection = [...prev, label];
        }

        onSelectionChange?.(newSelection);
        return newSelection;
      });
    },
    [disabled, isParentSelected, onSelectionChange],
  );

  const removeLabel = useCallback(
    (label: Label) => {
      if (disabled) return;
      setSelectedLabels((prev) => {
        const newSelection = prev.filter((l) => {
          if (!label.parent_id) {
            return l.id !== label.id && l.parent_id !== label.id;
          }
          return l.id !== label.id;
        });
        onSelectionChange?.(newSelection);
        return newSelection;
      });
    },
    [disabled, onSelectionChange],
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`min-h-[38px] p-2 border border-black rounded-md flex flex-wrap gap-2 ${
          disabled ? "cursor-not-allowed bg-gray-100" : "cursor-text"
        }`}
        onClick={() => !disabled && setIsOpen(true)}
      >
        {selectedLabels.map((label) => (
          <span
            key={label.id}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
          >
            {label.text}
            {!disabled && (
              <IoClose
                className="w-4 h-4 cursor-pointer hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  removeLabel(label);
                }}
              />
            )}
          </span>
        ))}
      </div>

      {isOpen && !disabled && (
        <div className="absolute w-fit mt-1 p-2 shadow-lg z-50 bg-white rounded-md border">
          <input
            type="text"
            placeholder="Filter labels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-2 focus:outline-none"
          />

          <div className="max-h-[300px] overflow-y-auto">
            {filteredItems.map((parent) => (
              <div key={parent.id} className="mb-4">
                <div
                  className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => toggleLabel(parent)}
                >
                  <span className="font-medium">{parent.text}</span>
                  {isSelected(parent) && (
                    <IoCheckmark className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <div className="ml-4">
                  {parent.children.map((child) => (
                    <div
                      key={child.id}
                      className={`flex items-center justify-between p-2 rounded
                        ${
                          isParentSelected(child.parent_id)
                            ? "hover:bg-gray-100 cursor-pointer"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      onClick={() => toggleLabel(child)}
                    >
                      <span>{child.text}</span>
                      {isSelected(child) && (
                        <IoCheckmark className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelSelector;
