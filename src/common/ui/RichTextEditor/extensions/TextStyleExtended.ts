import { AppLogger } from '@/common/services/Logger/Logger'
import TextStyle from '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: number) => ReturnType
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType
      increaseFontSize: () => ReturnType
      decreaseFontSize: () => ReturnType
    }
  }
}

export const TextStyleExtended = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: '12px',
        parseHTML: (element) => element.style.fontSize.replace('px', ''),
        renderHTML: (attributes) => {
          if (!attributes['fontSize']) {
            return {}
          }
          return {
            style: `font-size: ${attributes['fontSize']}px`,
          }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (fontSize) =>
          ({ commands }) => {
            return commands.setMark(this.name, { fontSize: fontSize })
          },
      unsetFontSize:
        () =>
          ({ chain }) => {
            return chain()
              .setMark(this.name, { fontSize: null })
              .removeEmptyTextStyle()
              .run()
          },
      // TODO: Implement increaseFontSize and decreaseFontSize
      increaseFontSize:
        () =>
          ({ commands, chain, state }) => {
            console.log('Increasing font size')
            // get the current font size (first text node in the selection or the default size)
            const { from, to } = state.selection
            let currentSize = 12
            state.doc.nodesBetween(from, to, (node) => {
              if (node.isText) {
                node.marks.forEach((mark) => {
                  console.log('mark', mark)
                  if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
                    currentSize = parseInt(mark.attrs.fontSize, 10)
                  }
                })
              }
            })
            console.log('Current size', currentSize)
            // increment the font size by 1
            // set the new font size

            return true

            //================================================================================================

            // const { from, to } = state.selection
            // console.log('nodes: ', state.doc)
            // state.doc.nodesBetween(from, to, (node, pos) => {
            //   console.log('node', node, 'pos', pos)
            //   if (node.isText) {
            //     const marks = node.marks
            //     if (marks.length) {
            //       console.log('Has marks', marks)
            //       marks.forEach((mark) => {
            //         if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
            //           console.log('foreach - textStyle')
            //           console.log('Has fontSize', mark.attrs.fontSize)
            //           const currentSize = parseInt(mark.attrs.fontSize, 10)
            //           chain()
            //             .setTextSelection({ from: pos, to: pos + node.nodeSize })
            //             .setMark('textStyle', {
            //               fontSize: currentSize + 1,
            //             })
            //             .run()
            //         } else {
            //           console.log('foreach - not textStyle')
            //         // TODO this may be redundant to do this for every mark... probably just need to check if font size is set in any mark
            //           chain()
            //             .setTextSelection({ from: pos, to: pos + node.nodeSize })
            //             .setMark('textStyle', { fontSize: 16 })
            //             .run()
            //         }
            //       })
            //     } else {
            //       console.log('No marks')
            //       chain()
            //         .setTextSelection({ from: pos, to: pos + node.nodeSize })
            //         .setMark('textStyle', { fontSize: 16 })
            //         .run()
            //     }
            //   }
            // })
            // return true

            //================================================================================================
            
            // console.log('Increasing font size')
            // let updated = false
            // const { from, to } = state.selection
            // console.log('from', from, 'to', to)
            // state.doc.nodesBetween(from, to, (node, pos) => {
            //   console.log('node', node, 'pos', pos)
            //   if (node.isTextblock) {
            //     node.marks.forEach((mark) => {
            //       if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
            //         const currentSize = parseInt(mark.attrs.fontSize, 10)
            //         chain()
            //           .focus()
            //           .setTextSelection({ from: pos, to: pos + node.nodeSize })
            //           .setMark('textStyle', { fontSize: currentSize + 1 })
            //           .run()
            //         updated = true
            //       }
            //     })
            //   } else {
            //     AppLogger.warn('increaseFontSize: Not a textblock')
            //   }
            // })
            // return updated
          },
      decreaseFontSize:
        () =>
          ({ chain, state }) => {
            console.log('Decreasing font size')
            let updated = false
            const { from, to } = state.selection
            state.doc.nodesBetween(from, to, (node, pos) => {
              if (node.isTextblock) {
                node.marks.forEach((mark) => {
                  if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
                    const currentSize = parseInt(mark.attrs.fontSize, 10)
                    chain()
                      .focus()
                      .setTextSelection({ from: pos, to: pos + node.nodeSize })
                      .setMark('textStyle', { fontSize: `${currentSize - 1}px` })
                      .run()
                    updated = true
                  }
                })
              } else {
                AppLogger.warn('decreaseFontSize: Not a textblock')
              }
            })
            return updated
          },
    }
  },
})
