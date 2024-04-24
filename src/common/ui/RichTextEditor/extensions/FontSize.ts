import TextStyle from '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: string) => ReturnType
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
      increaseFontSize:
        () =>
        ({ chain, state }) => {
          const { from, to } = state.selection
          let sizeIncreased = false
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.marks.length > 0) {
              node.marks.forEach((mark) => {
                if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
                  const currentSize = parseInt(mark.attrs.fontSize, 10)
                  chain()
                    .setMark(
                      'textStyle',
                      { fontSize: `${currentSize + 1}px` },
                      { from: pos, to: pos + node.nodeSize },
                    )
                    .run()
                  sizeIncreased = true
                }
              })
            }
          })
          return sizeIncreased
        },
      decreaseFontSize:
        () =>
        ({ chain, editor }) => {
          const currentSize = parseInt(
            editor.getAttributes('textStyle').fontSize || '16',
            10,
          )
          return chain()
            .setMark('textStyle', { fontSize: `${currentSize - 1}px` })
            .run()
        },
    }
  },
})
