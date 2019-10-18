'use babel';

import X86AssemblyHighlighterView from './x86-assembly-highlighter-view';
import { CompositeDisposable } from 'atom';

export default {

  x86AssemblyHighlighterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.x86AssemblyHighlighterView = new X86AssemblyHighlighterView(state.x86AssemblyHighlighterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.x86AssemblyHighlighterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'x86-assembly-highlighter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.x86AssemblyHighlighterView.destroy();
  },

  serialize() {
    return {
      x86AssemblyHighlighterViewState: this.x86AssemblyHighlighterView.serialize()
    };
  },

  toggle() {
    console.log('X86AssemblyHighlighter was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
