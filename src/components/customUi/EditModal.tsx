import React, { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/types";

interface EditModalProps {
  initialPost: Post;
  onSave: (editedPost: Partial<Post>) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  initialPost,
  onSave,
  onClose,
}) => {
  const [editedPost, setEditedPost] = useState(initialPost);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    onSave(editedPost);
    onClose();
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
        <Button onClick={onClose}>취소</Button>
      </div>
    </div>
  );
};

export default EditModal;
