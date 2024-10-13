function getDesigners(font) {
  const designers = font.designer.split(";");
  return designers.join(", ");
}

export default getDesigners;