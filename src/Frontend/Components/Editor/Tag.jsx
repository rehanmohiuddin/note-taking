import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from "draft-js/lib/uuid";
import React from "react";
import "./index.css";
function Tag({ tags, setTags, tagState }) {
  const handleTag = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, { _id: uuid(), name: e.target.value }]);
      e.target.value = "";
    }
  };
  const removeTagHandler = (id) =>
    setTags([...tags.filter((_tag) => _tag._id !== id)]);

  return (
    <div className="tag-container">
      {tags.map((_tag) => (
        <div key={_tag._id}>
          {_tag.name}
          <FontAwesomeIcon
            onClick={() => removeTagHandler(_tag._id)}
            icon={faRemove}
          />
        </div>
      ))}
      {tagState.enabled && <input onKeyDown={handleTag} />}
    </div>
  );
}

export default Tag;
