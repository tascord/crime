import * as ts from "typescript";

export default function(/*opts?: Opts*/) {
  function visitor(ctx: ts.TransformationContext, sf: ts.SourceFile) {
    const visitor: ts.Visitor = (node: ts.Node): ts.VisitResult<any> => {
      
      console.log('> ' + ts.SyntaxKind[node.kind]);

      return ts.visitEachChild(node, visitor, ctx)
    }
    return visitor
  }
  return (ctx: ts.TransformationContext): ts.Transformer<any> => {
    return (sf: ts.SourceFile) => ts.visitNode(sf, visitor(ctx, sf))
  }
}