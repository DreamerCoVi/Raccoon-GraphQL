 
const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var raccoons = [
    { species: 'Procyon lotor', range: 'NA, EU', id: '1' },
    { species: 'Procyon cancrivorus', range: 'Jungles,SnNAmerica', id: '2' },
    { species: 'Procyon minor', range: 'Gwadelop', id: '3' },
];

const RaccoonType = new GraphQLObjectType({
    name: 'Raccoon',
    fields: ( ) => ({
        id: { type: GraphQLString },
        species: { type: GraphQLString },
        range: { type: GraphQLString },
        //info: {typd: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        raccoon: {
            type: RaccoonType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(raccoons, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});