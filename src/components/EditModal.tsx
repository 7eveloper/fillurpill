import React, { useState } from "react";
import { Button } from "@/components/ui/PrimaryButton";
import { Label } from "@/components/ui/DefaultLabel";
import { Input } from "@/components/ui/DefaultInput";

const EditModal = ({ postId, initialPost, onSave, onCancel }) => {
  const [editedPost, setEditedPost] = useState(initialPost);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    onSave(postId, editedPost);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>게시물 수정</h2>
        <Label htmlFor="title">제목</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={editedPost.title}
          onChange={changeHandler}
        />
        <Label htmlFor="content">내용</Label>
        <textarea
          id="content"
          name="content"
          value={editedPost.content}
          onChange={changeHandler}
        />
        <Button onClick={submitHandler}>저장</Button>
        <Button onClick={onCancel}></Button>
      </div>
    </div>
  );
};

export default EditModal;
