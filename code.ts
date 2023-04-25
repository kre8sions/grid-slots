// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.loadFontAsync({ family: "Inter", style: "Regular" })
figma.loadFontAsync({ family: "NVIDIA Sans", style: "Regular" })
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

let h1,h2,h3,h4,h5,h6,h7,h8,h9,h10,h11,h12,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12;

figma.ui.resize(300,470);
figma.ui.onmessage = msg => {

  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.


  //Create a slot component
  
  if (msg.type === 'create-slots') {
    createSlots();
  }

 

  if (msg.type === 'add-slot'){
    const selection = figma.currentPage.selection as InstanceNode[];
    console.log(selection[0].mainComponent?.name.startsWith("horizontal" || "vertical"))
    const direction = selection[0].layoutMode.toLowerCase()
    const slotCount = selection[0].children.length + 1
    const slot = figma.currentPage.findOne(n => n.name === `${direction}x${slotCount}` && n.type === "COMPONENT") as ComponentNode;
    if(slotCount === 13){
      return
    } else {
      selection[0].swapComponent(slot);
    }
  }
  if (msg.type === 'remove-slot'){
    const selection = figma.currentPage.selection as InstanceNode[];
    console.log(selection[0].mainComponent?.name.startsWith("horizontal" || "vertical"))
    const direction = selection[0].layoutMode.toLowerCase()
    const slotCount = selection[0].children.length -1
    const slot = figma.currentPage.findOne(n => n.name === `${direction}x${slotCount}` && n.type === "COMPONENT") as ComponentNode;
    if(slotCount === 0){
      return
    } else {
      selection[0].swapComponent(slot);
    }
    
  }


  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};

function createSlot(){
  // const section = figma.createSection();
  // section.name = "Grid Slots";
  const slot = figma.createComponent();
  const label = figma.createText();
  label.characters = "◇\nSwap";
  label.fontSize = 10;
  label.fontName = {family: "NVIDIA Sans", style: "Regular"};
  label.textAlignHorizontal = "CENTER";
  label.textAlignVertical = "CENTER";
  label.fills = [{type: 'SOLID', color: {r: .282, g: .305, b: .341}}];
  label.name = "Label"
  slot.appendChild(label);
  slot.verticalPadding = 2;
  slot.horizontalPadding = 2;
  slot.name = "Slot";
  slot.strokeWeight = 1;
  slot.strokeAlign = "INSIDE";
  slot.strokes = [{type: 'SOLID', color: {r: .282, g: .305, b: .341}}];
  slot.layoutMode = "VERTICAL";
  slot.counterAxisSizingMode = "AUTO";
  slot.primaryAxisSizingMode = "AUTO";
  slot.fills = [{type: 'SOLID', color: {r: .776, g: .792, b: .816}}];
  // section.appendChild(slot);
  // figma.currentPage.selection = [slot];
  // figma.viewport.scrollAndZoomIntoView([section]);
  
}

function createSlotInstance(){
  const slot = figma.currentPage.findOne(n => n.name === "Slot" && n.type === "COMPONENT") as ComponentNode;
  slot?.createInstance();
  const slotInstance = figma.currentPage.findOne(n => n.name === "Slot" && n.type === "INSTANCE") as InstanceNode;
  return slotInstance
}



function createSlots(){
  createSlot()
  // const section = figma.currentPage.findOne(n=>(n.name === "Grid Slots"));
  // section.name = "Grid Slots";
  // section.appendChild(core)
  for (let count = 1; count <= 12; count++) {
    if (count > 1) {
      const hx1 = figma.currentPage.findOne(n => n.name === "horizontalx" + (count - 1) && n.type === "COMPONENT") as ComponentNode;
      const multiSlot = hx1.clone()
      multiSlot.name = "horizontalx" + count;
      multiSlot.appendChild(hx1.children[0].clone());
      // section.appendChild(multiSlot);
      const componentV = multiSlot.clone()
      // section.appendChild(componentV);
      componentV.name = "verticalx" + count;
      componentV.layoutMode = "VERTICAL";
      componentV.counterAxisSizingMode = "AUTO";
      componentV.x = componentV.width * (count + 1)
      componentV.y = 0
      multiSlot.x = 0
      multiSlot.y = multiSlot.height * (count + 1);
    } else {
      const slotInstanceH = createSlotInstance()
      const component = figma.createComponent();
      component.name = "horizontalx" + count;
      component.layoutMode = "HORIZONTAL";
      component.counterAxisSizingMode = "AUTO";
      component.appendChild(slotInstanceH);
      // section.appendChild(component);
      const componentV = component.clone()
      // section.appendChild(componentV);
      componentV.name = "verticalx" + count;
      componentV.layoutMode = "VERTICAL";
      componentV.counterAxisSizingMode = "AUTO";
      componentV.x = componentV.width * (count + 1)
      component.y = component.height * (count + 1);
    }
  }
  // for (let count = 1; count <= 12; count++) {
  //   if (count > 1) {
  //     const hx1 = figma.currentPage.findOne(n => n.name === "verticalx" + (count - 1) && n.type === "COMPONENT") as ComponentNode;
  //     const multiSlot = hx1.clone()
  //     multiSlot.name = "verticalx" + count;
  //     multiSlot.appendChild(hx1.children[0].clone());
  //     section.appendChild(multiSlot);
  //     multiSlot.x = multiSlot.width * (count + 1);
  //   } else {
  //     const slotInstanceV = createSlotInstance()
  //     const component = figma.createComponent();
  //     component.name = "verticalx" + count;
  //     component.layoutMode = "VERTICAL";
  //     component.counterAxisSizingMode = "AUTO";
  //     component.appendChild(slotInstanceV);
  //     section.appendChild(component);
  //     component.x = component.width * (count + 1);
  //   }
  // }

  let remainingSlot = figma.currentPage.findOne(n=> n.name === "Slot"&& n.type === "INSTANCE")
  

}
