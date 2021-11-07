const path = require('path');
const fs = require('fs');
const { Processor } = require('windicss/lib');
const { HTMLParser } = require('windicss/utils/parser');

exports.template = (comp, props) => {
  const Page = require(path.resolve(__dirname, 'pages', comp)).default;

  const { html } = Page.render(props);
  const styles = generateStyles(html);

  const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), {
    encoding: 'utf-8',
  });
  const renderedPage = template
    .replace(/{{STYLES}}/, styles)
    .replace(/{{BODY}}/, html);

  return renderedPage;
};

function generateStyles(html) {
  // Get windi processor
  const processor = new Processor({
    // plugins: [Animations],
  });

  // add your plugins
  // processor.loadPlugin(Animations)

  // Parse all classes and put into one line to simplify operations
  const htmlClasses = new HTMLParser(html)
    .parseClasses()
    .map((i) => i.result)
    .join(' ');

  // Generate preflight based on the html we input
  const preflightSheet = processor.preflight(html);

  // Process the html classes to an interpreted style sheet
  const interpretedSheet = processor.interpret(htmlClasses).styleSheet;

  // Build styles
  const APPEND = false;
  const MINIFY = false;
  const styles = interpretedSheet.extend(preflightSheet, APPEND).build(MINIFY);

  return styles;
}
