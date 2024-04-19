import { z } from 'zod';
export declare const minMediaCount = 1;
export declare const maxMediaCount = 8;
export declare const BaseGameModelSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    userId: z.ZodNumber;
    releaseDate: z.ZodDate;
    developer: z.ZodString;
    freeToPlay: z.ZodBoolean;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    price?: number | undefined;
    name: string;
    id: number;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
}, {
    price?: number | undefined;
    name: string;
    id: number;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
}>;
export declare const GameModelRequestSchema: z.ZodObject<z.extendShape<Omit<{
    id: z.ZodNumber;
    name: z.ZodString;
    userId: z.ZodNumber;
    releaseDate: z.ZodDate;
    developer: z.ZodString;
    freeToPlay: z.ZodBoolean;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodString;
}, "id">, {
    genres: z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "id">, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>, "many">;
    media: z.ZodEffects<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "image" | "video";
        url: string;
    }, {
        type: "image" | "video";
        url: string;
    }>, "many">, {
        type: "image" | "video";
        url: string;
    }[], {
        type: "image" | "video";
        url: string;
    }[]>;
}>, "strip", z.ZodTypeAny, {
    price?: number | undefined;
    name: string;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
    genres: {
        name: string;
    }[];
    media: {
        type: "image" | "video";
        url: string;
    }[];
}, {
    price?: number | undefined;
    name: string;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
    genres: {
        name: string;
    }[];
    media: {
        type: "image" | "video";
        url: string;
    }[];
}>;
export declare const DetailedGameModelSchema: z.ZodObject<z.extendShape<{
    id: z.ZodNumber;
    name: z.ZodString;
    userId: z.ZodNumber;
    releaseDate: z.ZodDate;
    developer: z.ZodString;
    freeToPlay: z.ZodBoolean;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodString;
}, {
    creator: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        email: z.ZodString;
        picture: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        email: string;
        picture: string;
    }, {
        name: string;
        id: number;
        email: string;
        picture: string;
    }>;
    genres: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
    }, {
        name: string;
        id: number;
    }>, "many">;
    media: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        gameId: z.ZodNumber;
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    }, {
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    }>, "many">;
    createdAt: z.ZodDate;
}>, "strip", z.ZodTypeAny, {
    price?: number | undefined;
    name: string;
    id: number;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
    genres: {
        name: string;
        id: number;
    }[];
    media: {
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    }[];
    creator: {
        name: string;
        id: number;
        email: string;
        picture: string;
    };
    createdAt: Date;
}, {
    price?: number | undefined;
    name: string;
    id: number;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
    genres: {
        name: string;
        id: number;
    }[];
    media: {
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    }[];
    creator: {
        name: string;
        id: number;
        email: string;
        picture: string;
    };
    createdAt: Date;
}>;
export declare const UpdateGameModelSchema: z.ZodObject<z.extendShape<{
    id: z.ZodNumber;
    name: z.ZodString;
    userId: z.ZodNumber;
    releaseDate: z.ZodDate;
    developer: z.ZodString;
    freeToPlay: z.ZodBoolean;
    price: z.ZodOptional<z.ZodNumber>;
    description: z.ZodString;
}, {
    genres: z.ZodArray<z.ZodObject<Omit<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "id">, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>, "many">;
    media: z.ZodEffects<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodNumber;
        gameId: z.ZodNumber;
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    }, {
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["image", "video"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "image" | "video";
        url: string;
    }, {
        type: "image" | "video";
        url: string;
    }>]>, "many">, ({
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    } | {
        type: "image" | "video";
        url: string;
    })[], ({
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    } | {
        type: "image" | "video";
        url: string;
    })[]>;
}>, "strip", z.ZodTypeAny, {
    price?: number | undefined;
    name: string;
    id: number;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
    genres: {
        name: string;
    }[];
    media: ({
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    } | {
        type: "image" | "video";
        url: string;
    })[];
}, {
    price?: number | undefined;
    name: string;
    id: number;
    userId: number;
    releaseDate: Date;
    developer: string;
    freeToPlay: boolean;
    description: string;
    genres: {
        name: string;
    }[];
    media: ({
        id: number;
        type: "image" | "video";
        gameId: number;
        url: string;
    } | {
        type: "image" | "video";
        url: string;
    })[];
}>;
export declare type BaseGameModel = z.infer<typeof BaseGameModelSchema>;
export declare type GameModelRequest = z.infer<typeof GameModelRequestSchema>;
export declare type DetailedGameModel = z.infer<typeof DetailedGameModelSchema>;
export declare type UpdateGameModel = z.infer<typeof UpdateGameModelSchema>;
