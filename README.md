# ng-bulbox
An AngularJS 1.7.x library to create programatic modals and dialog boxes utilizing Bulma.


## Options
`bulbox.options` supports the following fields for configuration:
1. title: `default: undefined`
2. body: `default: undefined`
3. buttons: `default: { confirm: { text: 'Okay', color: 'is-primary', cb: undefined }, dismiss: undefined }`
4. size: `default: 'lg'`
5. bodyIsHtml: `default: false`
6. animation: `'appear'`

### Animations
There are 3 animation options available: `'appear'`, `'zoom'`, and `'flip'`.
