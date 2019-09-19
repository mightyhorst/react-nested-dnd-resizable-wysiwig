import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/**
 * @package Resizable
 * @description Resizable React
 */
// import { Resizable } from "re-resizable";
import { Rnd } from "react-rnd";

/**
 * @package WYSIWIG
 * @description Draft Js editor
 */
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

/**
 * @package Resizable Styles
 * @description Resizable React styles
 */
const resizeStyle = {
  display: "block",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  position: "relative",
  left: "100px",
  maxHeight: "50px",
  minHeight: "50px",
  height: "50px"
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 10px 10px 0`,

  display: "block",
  width: "100%",
  padding: "10px",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",
  display: "block",
  padding: "10px",
  margin: "0 10px 10px 0",
  border: "1px solid grey",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  margin: "10px 0"
});

export default class ServiceCommandUnit extends React.Component {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <Droppable droppableId={this.props.type} type={`droppableSubItem`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {this.props.subItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div style={{ display: "block" }}>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                      <span
                        {...provided.dragHandleProps}
                        style={{
                          display: "block",
                          margin: "0 10px",
                          border: "1px solid #000"
                        }}
                      >
                        Drag
                      </span>

                      <select style={{ display: "block" }}>
                        <option value="description">Notepad</option>
                        <option value="code">Code Panel</option>
                      </select>

                      <input className="start" defaultValue="0" type="range" />
                      <input className="end" defaultValue="4000" type="range" />

                      <Editor
                        toolbarOnFocus
                        toolbar={{
                          //options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                          options: ["inline", "blockType"],
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true }
                        }}
                      />

                      <Rnd
                        style={resizeStyle}
                        dragGrid={[20, 20]}
                        resizeGrid={[20, 20]}
                        maxHeight="50px"
                        minHeight="50px"
                        dragAxis="x"
                        resizeAxis="x"
                        bounds="parent"
                        default={{
                          x: 0,
                          y: 0,
                          width: 320,
                          height: 200
                        }}
                      >
                        Rnd
                      </Rnd>
                    </div>

                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
