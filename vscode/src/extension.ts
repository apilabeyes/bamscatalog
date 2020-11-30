import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('APICatalog.start', () => {
			APICatalogPanel.createOrShow(context.extensionUri);
		})
	);

	// context.subscriptions.push(
	// 	vscode.commands.registerCommand('catCoding.doRefactor', () => {
	// 		if (APICatalogPanel.currentPanel) {
	// 			APICatalogPanel.currentPanel.doRefactor();
	// 		}
	// 	})
	// );

	if (vscode.window.registerWebviewPanelSerializer) {
		// Make sure we register a serializer in activation event
		vscode.window.registerWebviewPanelSerializer(APICatalogPanel.viewType, {
			async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
				console.log(`Got state: ${state}`);
				APICatalogPanel.revive(webviewPanel, context.extensionUri);
			}
		});
	}
}

/**
 * Manages API Catalog webview panels
 */
class APICatalogPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: APICatalogPanel | undefined;

	public static readonly viewType = 'APICatalog';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;

		// If we already have a panel, show it.
		if (APICatalogPanel.currentPanel) {
			APICatalogPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			APICatalogPanel.viewType,
			'API Catalog',
			column || vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
				enableScripts: true,

				// And restrict the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
			}
		);

		APICatalogPanel.currentPanel = new APICatalogPanel(panel, extensionUri);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		APICatalogPanel.currentPanel = new APICatalogPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Update the content based on view changes
		this._panel.onDidChangeViewState(
			e => {
				if (this._panel.visible) {
					this._update();
				}
			},
			null,
			this._disposables
		);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'alert':
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		APICatalogPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._panel.webview;
		this._panel.webview.html = this._getHtmlForWebview(webview);
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const basePath = vscode.Uri.joinPath(this._extensionUri, 'media');

		const baseUri = webview.asWebviewUri(basePath);

		// Use a nonce to only allow specific scripts to be run
		const nonce = getNonce();
		const pathToHtml = vscode.Uri.joinPath(this._extensionUri, 'media','index.html');
		const pathUri = pathToHtml.with({scheme: 'vscode-resource'});
		const renderedBaseUri = `${baseUri}`+'\/';

		const htmlStr = fs.readFileSync(pathUri.fsPath,'utf8');
		let replacedHtmlStr = htmlStr.replace(/href="/g, "href=\""+renderedBaseUri)
		replacedHtmlStr = replacedHtmlStr.replace(/src="/g, "src=\""+renderedBaseUri)
		replacedHtmlStr = replacedHtmlStr.replace(/data-working-directory-path="/gm, "data-working-directory-path=\""+renderedBaseUri)
		return replacedHtmlStr;
		
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}