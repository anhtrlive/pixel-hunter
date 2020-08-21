const resize = (frame, given) => {
  const obj = {
    width: 0,
    height: 0,
  };
  if (frame.width > frame.height) {
    if (given.width > given.height) {
      const multiplayer = given.width / given.height;
      obj.width = frame.width;
      obj.height = Math.floor(frame.width / multiplayer);
    } else if (given.width < given.height) {
      const multiplayer = given.height / given.width;
      obj.height = frame.height;
      obj.width = Math.floor(frame.height / multiplayer);
    } else if (given.width === given.height) {
      obj.height = frame.height;
      obj.width = frame.height;
    }
  } else if (frame.width === frame.height) {
    if (given.width > given.height) {
      const multiplayer = given.width / given.height;
      obj.width = frame.width;
      obj.height = Math.floor(frame.width / multiplayer);
    } else if (given.width === given.height) {
      obj.width = frame.width;
      obj.height = frame.width;
    } else if (given.width < given.height) {
      const multiplayer = given.height / given.width;
      obj.height = frame.height;
      obj.width = Math.floor(frame.height / multiplayer);
    }
  } else if (frame.width < frame.height) {
    if (given.width > given.height) {
      const multiplayer = given.width / given.height;
      obj.width = frame.width;
      obj.height = Math.floor(frame.width / multiplayer);
    } else if (given.width === given.height) {
      obj.width = frame.width;
      obj.height = frame.width;
    } else if (given.width < given.height) {
      const multiplayer = given.height / given.width;
      obj.height = frame.height;
      obj.width = Math.floor(frame.height / multiplayer);
    }
  }
  return obj;
};

export {resize};
